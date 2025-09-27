import React, { useEffect, useState } from 'react';
import {
  Container, Paper, Typography, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, Stack
} from '@mui/material';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function App() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [product, setProduct] = useState('');
  const [location, setLocation] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [unit, setUnit] = useState('');
  const [chartData, setChartData] = useState([]);

  // Load dropdown options from backend
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/options')
      .then(res => {
        console.log("Options response:", res.data);
        setProducts(res.data.products || []);
        setLocations(res.data.locations || []);
      })
      .catch(err => {
        console.error("Error fetching options:", err);
        alert("Failed to load products and locations. Make sure the backend is running.");
      });
  }, []);

  // Handle prediction request
  const handleForecast = () => {
    if (!product || !location || !month || !year) {
      alert("Please select product, location, month, and year");
      return;
    }

    axios.post('http://127.0.0.1:5000/forecast', {
      product,
      location,
      month: Number(month),
      year: Number(year)
    })
    .then(res => {
      console.log("Forecast response:", res.data);
      if (res.data.predicted_price_maluti !== undefined) {
        setPrediction(res.data.predicted_price_maluti);
        setUnit(res.data.unit || '');
        setChartData(prev => [
          ...prev,
          {
            month: `${month}/${year}`,
            price: res.data.predicted_price_maluti
          }
        ]);
      } else {
        alert("Unexpected response from server");
      }
    })
    .catch(err => {
      console.error("Error fetching forecast:", err);
      alert("Failed to get forecast. Check backend logs.");
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 3, backgroundColor: 'background.paper' }} elevation={3}>
        <Typography variant="h4" color="primary" gutterBottom>
          Market Price Forecaster
        </Typography>

        {/* Dropdowns */}
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Product</InputLabel>
            <Select
              value={product}
              onChange={e => setProduct(e.target.value)}
            >
              {products.map((p, i) => (
                <MenuItem key={i} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
              {locations.map((l, i) => (
                <MenuItem key={i} value={l}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Month & Year inputs */}
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 2 }}>
          <TextField
            label="Month (1-12)"
            type="number"
            value={month}
            onChange={e => setMonth(e.target.value)}
            fullWidth
          />
          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Predict button */}
        <Button variant="contained" color="primary" onClick={handleForecast}>
          Predict
        </Button>

        {/* Prediction result */}
        {prediction !== null && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Predicted Price: <strong style={{ color: '#ff4081' }}>
              {prediction.toFixed(2)} LSL
            </strong> {unit ? `per ${unit}` : ''}
          </Typography>
        )}

        {/* Chart */}
        <Paper sx={{ p: 2, mt: 4, backgroundColor: '#242424' }} elevation={2}>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#ff4081"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Paper>
    </Container>
  );
}
