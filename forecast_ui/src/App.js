import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Product translation dictionary (keys are lowercase and match backend names)
const PRODUCT_TRANSLATIONS = {
  "bread (brown)": "Bohobe",
  "maize meal": "Phofo ea Poone",
  "wheat flour": "Phoofo ea koro",
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [unit, setUnit] = useState("");
  const [chartData, setChartData] = useState([]);
  const [language, setLanguage] = useState("en");

  // Load dropdown options from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/options")
      .then((res) => {
        setProducts(res.data.products || []);
        setLocations(res.data.locations || []);
      })
      .catch((err) => {
        console.error("Error fetching options:", err);
        alert(
          "Failed to load products and locations. Make sure the backend is running."
        );
      });
  }, []);

  // Handle forecast request
  const handleForecast = () => {
    if (!product || !location || !month || !year) {
      alert(
        language === "st"
          ? "Ka kopo khetha sehlahisoa, sebaka, khoeli le selemo"
          : "Please select product, location, month, and year"
      );
      return;
    }

    axios
      .post("http://127.0.0.1:5000/forecast", {
        product,
        location,
        month: Number(month),
        year: Number(year),
        language,
      })
      .then((res) => {
        const data = res.data;
        console.log("Forecast response:", data);

        const priceValue =
          data.predicted_price_maluti ??
          data["Price per kg (Maloti)"] ??
          data["Theko ka kilogramme (Maloti)"];

        if (priceValue !== undefined) {
          setPrediction(priceValue);
          setUnit(data.unit || "kg");
          setChartData((prev) => [
            ...prev,
            {
              month: `${month}/${year}`,
              price: priceValue,
            },
          ]);
        } else {
          alert(
            language === "st"
              ? "Karabo e tsoang ho seva e sa lebelloang"
              : "Unexpected response from server"
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching forecast:", err);
        alert(
          language === "st"
            ? "Ho hlolehile ho fumana ponelopele. Lekola seva."
            : "Failed to get forecast. Check backend logs."
        );
      });
  };

  // Reset form & chart
  const handleReset = () => {
    setProduct("");
    setLocation("");
    setMonth("");
    setYear("");
    setPrediction(null);
    setChartData([]);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 3, backgroundColor: "background.paper" }} elevation={3}>
        {/* Header and language toggle */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            {language === "st"
              ? "Sesebelisoa sa ho Hakanya Theko ea Maraka"
              : "Market Price Forecaster"}
          </Typography>

          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={(e, val) => val && setLanguage(val)}
            size="small"
          >
            <ToggleButton value="en">🇬🇧 English</ToggleButton>
            <ToggleButton value="st">🇱🇸 Sesotho</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* Dropdowns */}
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ mb: 2 }}
        >
          {/* Product Dropdown */}
          <FormControl fullWidth>
            <InputLabel>
              {language === "st" ? "Lihlahisoa" : "Product"}
            </InputLabel>
            <Select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {products.map((p, i) => {
                const normalizedKey = p.trim().toLowerCase();
                const translatedProduct =
                  language === "st"
                    ? PRODUCT_TRANSLATIONS[normalizedKey] || p
                    : p;
                return (
                  <MenuItem key={i} value={p}>
                    {translatedProduct}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Location Dropdown */}
          <FormControl fullWidth>
            <InputLabel>{language === "st" ? "Sebaka" : "Location"}</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map((l, i) => (
                <MenuItem key={i} value={l}>
                  {l}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Month & Year Inputs */}
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ mb: 2 }}
        >
          <TextField
            label={language === "st" ? "Khoeli (1-12)" : "Month (1-12)"}
            type="number"
            value={month}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < 1 || val > 12) return; // restrict month
              setMonth(e.target.value);
            }}
            fullWidth
          />
          <TextField
            label={language === "st" ? "Selemo" : "Year"}
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Predict & Reset Buttons */}
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleForecast}>
            {language === "st" ? "Hakanya" : "Predict"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            {language === "st" ? "Seta bocha" : "Reset"}
          </Button>
        </Stack>

        {/* Prediction Result */}
        {prediction !== null && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            {language === "st" ? "Lihakanyo tsa Theko:" : "Predicted Price per kg:"}{" "}
            <strong style={{ color: "#ff4081" }}>
              {prediction.toFixed(2)} LSL
            </strong>{" "}
            {unit ? `per ${unit}` : ""}
          </Typography>
        )}

        {/* Chart */}
        <Paper sx={{ p: 2, mt: 4, backgroundColor: "#242424" }} elevation={2}>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis
                stroke="#ccc"
                label={{
                  value:
                    language === "st"
                      ? "Theko (Maloti/kg)"
                      : "Price (LSL/kg)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ccc",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#ff4081"
                strokeWidth={2}
                dot={(data) => {
                  const lastIndex = chartData.length - 1;
                  if (chartData.indexOf(data.payload) === lastIndex) {
                    return (
                      <circle r={6} fill="#00ff00" stroke="#fff" strokeWidth={2} />
                    ); // highlight last point
                  }
                  return <circle r={3} fill="#ff4081" stroke="#fff" strokeWidth={1} />;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Paper>
    </Container>
  );
}

