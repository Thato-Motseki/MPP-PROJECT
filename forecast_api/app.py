from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = "price_model.pkl"
PRODUCT_ENCODER_PATH = "product_encoder.pkl"
LOCATION_ENCODER_PATH = "location_encoder.pkl"
UNIT_MAPPING_PATH = "unit_mapping.pkl"

if not all(os.path.exists(p) for p in [MODEL_PATH, PRODUCT_ENCODER_PATH, LOCATION_ENCODER_PATH, UNIT_MAPPING_PATH]):
    raise FileNotFoundError(" Model or encoder files not found. Run train_model.py first.")

model = joblib.load(MODEL_PATH)
product_encoder = joblib.load(PRODUCT_ENCODER_PATH)
location_encoder = joblib.load(LOCATION_ENCODER_PATH)
unit_mapping = joblib.load(UNIT_MAPPING_PATH)

@app.route("/options", methods=["GET"])
def options():
    return jsonify({
        "products": product_encoder,
        "locations": location_encoder
    })

@app.route("/forecast", methods=["POST"])
def forecast():
    try:
        data = request.get_json()
        product_name = data.get("product")
        location_name = data.get("location")
        month = int(data.get("month"))
        year = int(data.get("year"))

        if product_name not in product_encoder:
            return jsonify({"error": f"Unknown product: {product_name}"}), 400
        if location_name not in location_encoder:
            return jsonify({"error": f"Unknown location: {location_name}"}), 400

        product_code = product_encoder.index(product_name)
        location_code = location_encoder.index(location_name)

        X = pd.DataFrame([{
            "month": month,
            "year": year,
            "product_encoded": product_code,
            "location_encoded": location_code
        }])

        predicted_price = float(model.predict(X)[0])
        unit = unit_mapping.get(product_name, "Unknown unit")

        return jsonify({
            "product": product_name,
            "location": location_name,
            "month": month,
            "year": year,
            "predicted_price_maluti": round(predicted_price, 2),
            "unit": unit
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
