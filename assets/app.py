# app.py
from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load model and encoders
model = joblib.load("model.pkl")
crop_encoder = joblib.load("crop_encoder.pkl")
location_encoder = joblib.load("location_encoder.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        location = data['location']
        crop = data['crop']
        supply = data['supply']
        demand = data['demand']
        input_cost = data['input_cost']

        # Encode categorical features
        crop_encoded = crop_encoder.transform([crop])[0]
        location_encoded = location_encoder.transform([location])[0]

        # Prepare features
        features = [[crop_encoded, location_encoded, supply, demand, input_cost]]

        # Predict
        predicted_price = model.predict(features)[0]

        return jsonify({
            "crop": crop,
            "location": location,
            "predicted_price": round(predicted_price, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
