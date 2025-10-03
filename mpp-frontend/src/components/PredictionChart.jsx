import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const getChartData = (crop) => {
  const baseData = {
    corn: [
      { date: "Week 1", historical: 85, predicted: null, confidence: null },
      { date: "Week 2", historical: 87, predicted: null, confidence: null },
      { date: "Week 3", historical: 88, predicted: null, confidence: null },
      { date: "Week 4", historical: 88.5, predicted: 89, confidence: 94 },
      { date: "Week 5", historical: null, predicted: 91, confidence: 92 },
      { date: "Week 6", historical: null, predicted: 93, confidence: 90 },
      { date: "Week 7", historical: null, predicted: 95, confidence: 88 },
      { date: "Week 8", historical: null, predicted: 95.2, confidence: 85 },
    ],
    wheat: [
      { date: "Week 1", historical: 75, predicted: null, confidence: null },
      { date: "Week 2", historical: 73, predicted: null, confidence: null },
      { date: "Week 3", historical: 72, predicted: null, confidence: null },
      { date: "Week 4", historical: 72.3, predicted: 71, confidence: 89 },
      { date: "Week 5", historical: null, predicted: 70, confidence: 87 },
      { date: "Week 6", historical: null, predicted: 69, confidence: 85 },
      { date: "Week 7", historical: null, predicted: 68.5, confidence: 82 },
      { date: "Week 8", historical: null, predicted: 68.4, confidence: 80 },
    ],
    beans: [
      { date: "Week 1", historical: 98, predicted: null, confidence: null },
      { date: "Week 2", historical: 99, predicted: null, confidence: null },
      { date: "Week 3", historical: 100, predicted: null, confidence: null },
      { date: "Week 4", historical: 100.2, predicted: 102, confidence: 92 },
      { date: "Week 5", historical: null, predicted: 104, confidence: 90 },
      { date: "Week 6", historical: null, predicted: 106, confidence: 88 },
      { date: "Week 7", historical: null, predicted: 108, confidence: 85 },
      { date: "Week 8", historical: null, predicted: 108.8, confidence: 83 },
    ],
    potatoes: [
      { date: "Week 1", historical: 52, predicted: null, confidence: null },
      { date: "Week 2", historical: 54, predicted: null, confidence: null },
      { date: "Week 3", historical: 55, predicted: null, confidence: null },
      { date: "Week 4", historical: 55.8, predicted: 57, confidence: 87 },
      { date: "Week 5", historical: null, predicted: 58, confidence: 85 },
      { date: "Week 6", historical: null, predicted: 60, confidence: 83 },
      { date: "Week 7", historical: null, predicted: 61.5, confidence: 80 },
      { date: "Week 8", historical: null, predicted: 62.1, confidence: 78 },
    ],
  };

  return baseData[crop] || baseData.corn;
};

export function PredictionChart({ crop }) {
  const data = getChartData(crop);

  // Find first index where historical is null and predicted is not null - boundary
  const currentWeek = data.findIndex(d => d.historical === null && d.predicted !== null);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `M${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value, name) => {
              if (value === null) return ['N/A', name];
              return [`M${value}`, name === 'historical' ? 'Historical Price' : 'Predicted Price'];
            }}
          />
          
          {/* Reference line to separate historical vs predicted */}
          {currentWeek >= 0 && (
            <ReferenceLine 
              x={data[currentWeek].date} 
              stroke="#e5e7eb" 
              strokeDasharray="5 5"
              label={{ value: "Now", position: "top" }}
            />
          )}
          
          {/* Historical data line */}
          <Line 
            type="monotone" 
            dataKey="historical" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            connectNulls={false}
          />
          
          {/* Predicted data line */}
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#3b82f6" 
            strokeWidth={3}
            strokeDasharray="8 4"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-green-500"></div>
          <span className="text-sm text-gray-600">Historical Price</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-0.5" 
            style={{ 
              borderTop: '2px dashed #3b82f6',
              background: 'transparent'
            }}
          ></div>
          <span className="text-sm text-gray-600">Predicted Price</span>
        </div>
      </div>
      
      {/* Chart Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Prediction Model:</span> Machine learning algorithm trained on 5+ years of market data, weather patterns, and seasonal trends.
        </p>
      </div>
    </div>
  );
}
