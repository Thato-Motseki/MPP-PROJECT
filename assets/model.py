# model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib

def train_model(data_path="data.csv", model_path="model.pkl"):
    # Load data
    df = pd.read_csv(data_path)

    # Encode categorical features
    le_crop = LabelEncoder()
    le_location = LabelEncoder()
    df['crop'] = le_crop.fit_transform(df['crop'])
    df['location'] = le_location.fit_transform(df['location'])

    # Features and target
    X = df[['crop', 'location', 'supply', 'demand', 'input_cost']]
    y = df['price']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save model and encoders
    joblib.dump(model, model_path)
    joblib.dump(le_crop, "crop_encoder.pkl")
    joblib.dump(le_location, "location_encoder.pkl")

    print("Model trained and saved!")

if __name__ == "__main__":
    train_model()
