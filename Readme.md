#  Market Price Forecaster

A full‑stack application for forecasting market prices in Lesotho, built with:
- **Backend**: Flask (Python)
- **Frontend**: React + Material UI + Recharts
- **Data**: WFP food prices and market metadata

---

##  Quick Start (Daily Use)

When everything is already set up and dependencies are installed:

**Terminal 1 – Backend**
```bash
cd market_forecaster/forecast_api
.\venv\Scripts\activate
python train_model.py   # only if data/model changed
python app.py


cd market_forecaster/forecast_ui
npm start


http://localhost:3000


## How It Works ##
# Backend (http://127.0.0.1:5000) #
GET /options → Returns available products and locations.

POST /forecast → Returns predicted price and the unit/quantity.

# Frontend (http://localhost:3000) #
Fetches dropdown data from /options.

Sends user selections to /forecast.

Displays the predicted price with its unit/quantity.

Plots predictions on a chart for visual analysis.