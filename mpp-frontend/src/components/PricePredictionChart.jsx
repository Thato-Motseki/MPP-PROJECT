import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

const predictionData = [
  { month: "Jan", price: 40 },
  { month: "Feb", price: 45 },
  { month: "Mar", price: 42 },
  { month: "Apr", price: 50 },
  { month: "May", price: 55 },
  { month: "Jun", price: 60 },
  { month: "Jul", price: 65 },
  { month: "Aug", price: 70 },
  { month: "Sep", price: 75 },
  { month: "Oct", price: 80 },
];

export function PricePredictionChart() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Price Predictions</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-600">Current Trend</p>
          <p className="font-semibold text-green-600">+15.2% this month</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Predicted Price</p>
          <p className="font-semibold text-gray-900">M80 by October</p>
        </div>
      </div>
    </div>
  );
}