import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import sys

# == Step 1: Load datasets ===
try:
    prices = pd.read_csv("wfp_food_prices_lso_qc.csv")
    markets = pd.read_csv("wfp_markets_lso.csv")
except FileNotFoundError as e:
    print(f" Missing file: {e}")
    sys.exit(1)

print(f" Loaded prices: {prices.shape[0]} rows, markets: {markets.shape[0]} rows")

# === Step 2: Parse 'code' into location, product, and unit ===
parts = prices['code'].str.split('-', expand=True)
if parts.shape[1] < 5:
    print(" Unexpected 'code' format. Check your CSV.")
    sys.exit(1)

prices['location'] = parts[0].str.strip()
prices['product'] = parts[3].str.strip()
prices['unit'] = parts[4].str.strip()  # e.g., "12.5 KG"

# === Step 3: Merge with market metadata ===
merged = prices.merge(markets, left_on='location', right_on='market', how='left')
print(f"ℹ After merge: {merged.shape[0]} rows")

# === Step 4: Clean and convert price column ===
merged['usdprice'] = merged['usdprice'].astype(str)
merged['usdprice'] = pd.to_numeric(merged['usdprice'], errors='coerce')
before_drop = merged.shape[0]
merged = merged.dropna(subset=['usdprice', 'product', 'location'])
print(f"ℹ Dropped {before_drop - merged.shape[0]} rows due to NaNs or bad price values")

# === Step 5: Convert USD to Maluti ===
EXCHANGE_RATE = 18.5
merged['price_maluti'] = merged['usdprice'] * EXCHANGE_RATE

# === Step 6: Extract time features ===
merged['date'] = pd.to_datetime(merged['date'], errors='coerce')
merged['month'] = merged['date'].dt.month
merged['year'] = merged['date'].dt.year
merged = merged.dropna(subset=['month', 'year'])

# === Step 7: Encode categorical features ===
merged['product_encoded'] = merged['product'].astype('category').cat.codes
merged['location_encoded'] = merged['location'].astype('category').cat.codes

# Save encoders for API use
product_encoder = list(merged['product'].astype('category').cat.categories)
location_encoder = list(merged['location'].astype('category').cat.categories)
joblib.dump(product_encoder, "product_encoder.pkl")
joblib.dump(location_encoder, "location_encoder.pkl")

# Save unit mapping for API use
unit_mapping = merged.groupby('product')['unit'].first().to_dict()
joblib.dump(unit_mapping, "unit_mapping.pkl")

# === Step 8: Select features and target ===
features = merged[['month', 'year', 'product_encoded', 'location_encoded']]
target = merged['price_maluti']

if features.empty:
    print(" No training data available after cleaning. Check merge keys and CSV content.")
    sys.exit(1)

# === Step 9: Train/test split ===
X_train, X_test, y_train, y_test = train_test_split(
    features, target, test_size=0.2, random_state=42
)

# === Step 10: Train model ===
model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# === Step 11: Save model ===
joblib.dump(model, "price_model.pkl")

# === Step 12: Print summary ===
print("\n Model trained and saved as price_model.pkl")
print(f"Training samples: {X_train.shape[0]}, Test samples: {X_test.shape[0]}")
print("\nAvailable products:")
for i, name in enumerate(product_encoder):
    print(f"  {i}: {name}")

print("\nAvailable locations:")
for i, name in enumerate(location_encoder):
    print(f"  {i}: {name}")
