from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load trained models
model = joblib.load("models/model.pkl")
crop_encoder = joblib.load("models/crop_encoder.pkl")
location_encoder = joblib.load("models/location_encoder.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Case 1: JSON request (API)
        if request.is_json:
            data = request.get_json()
            crop = data["crop"]
            location = data["location"]
            supply = float(data["supply"])
            demand = float(data["demand"])
            input_cost = float(data["input_cost"])

            crop_encoded = crop_encoder.transform([crop])[0]
            location_encoded = location_encoder.transform([location])[0]
            features = [[crop_encoded, location_encoded, supply, demand, input_cost]]
            predicted_price = model.predict(features)[0]

            return jsonify({
                "crop": crop,
                "location": location,
                "predicted_price": round(predicted_price, 2)
            })

        # Case 2: HTML Form submission
        else:
            crop = request.form['crop']
            location = request.form['location']
            supply = float(request.form['supply'])
            demand = float(request.form['demand'])
            input_cost = float(request.form['input_cost'])

            crop_encoded = crop_encoder.transform([crop])[0]
            location_encoded = location_encoder.transform([location])[0]
            features = [[crop_encoded, location_encoded, supply, demand, input_cost]]
            predicted_price = model.predict(features)[0]

            return render_template(
                "index.html",
                prediction_text=f"Predicted price for {crop} in {location}: {round(predicted_price, 2)} LSL"
            )

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
