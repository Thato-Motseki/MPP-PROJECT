from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os


# Language translation dictionaries

TRANSLATIONS = {
    "en": {
        "product": "Product",
        "location": "Location",
        "price_per_kg": "Price per kg (Maloti)"
    },
    "st": {
        "product": "Lihlaisoa",
        "location": "Sebaka",
        "price_per_kg": "Theko ka kilogramme (Maloti)"
    }
}

PRODUCT_TRANSLATIONS = {
    "Maize": "Poone",
    "Bread": "Bohobe",
    "Wheat Flour": "Phoofo ea koro"
}


# Flask App Initialization

app = Flask(__name__)
CORS(app)


# Model and Encoders

MODEL_PATH = "price_model.pkl"
PRODUCT_ENCODER_PATH = "product_encoder.pkl"
LOCATION_ENCODER_PATH = "location_encoder.pkl"
UNIT_MAPPING_PATH = "unit_mapping.pkl"

# Check model files exist
if not all(os.path.exists(p) for p in [MODEL_PATH, PRODUCT_ENCODER_PATH, LOCATION_ENCODER_PATH, UNIT_MAPPING_PATH]):
    raise FileNotFoundError("Model or encoder files not found. Run train_model.py first.")

# Load model and encoders
model = joblib.load(MODEL_PATH)
product_encoder = joblib.load(PRODUCT_ENCODER_PATH)
location_encoder = joblib.load(LOCATION_ENCODER_PATH)
unit_mapping = joblib.load(UNIT_MAPPING_PATH)


# Routes

@app.route("/options", methods=["GET"])
def options():
    """Return available products and locations."""
    return jsonify({
        "products": product_encoder,
        "locations": location_encoder
    })


@app.route("/forecast", methods=["POST"])
def forecast():
    """Predict price and return translated response if Sesotho is selected."""
    try:
        data = request.get_json()
        product_name = data.get("product")
        location_name = data.get("location")
        month = int(data.get("month"))
        year = int(data.get("year"))
        lang = data.get("language", "en")  # default English

        # Input validation
        if product_name not in product_encoder:
            return jsonify({"error": f"Unknown product: {product_name}"}), 400
        if location_name not in location_encoder:
            return jsonify({"error": f"Unknown location: {location_name}"}), 400

        # Encode categorical features
        product_code = product_encoder.index(product_name)
        location_code = location_encoder.index(location_name)

        # Prepare input for model
        X = pd.DataFrame([{
            "month": month,
            "year": year,
            "product_encoded": product_code,
            "location_encoded": location_code
        }])

        # Predict price
        predicted_price = float(model.predict(X)[0])
        unit = unit_mapping.get(product_name, "Unknown unit")

        # Translation logic
        if lang == "st":
            product_display = PRODUCT_TRANSLATIONS.get(product_name, product_name)
            labels = TRANSLATIONS["st"]
        else:
            product_display = product_name
            labels = TRANSLATIONS["en"]

        # Response
        return jsonify({
            labels["product"]: product_display,
            labels["location"]: location_name,
            "month": month,
            "year": year,
            labels["price_per_kg"]: round(predicted_price, 2),
            "unit": unit
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Run the app

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
