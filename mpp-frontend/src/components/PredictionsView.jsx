import { useState } from "react";
import { TrendingUp, Calendar, Target, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { PredictionChart } from "./PredictionChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function PredictionsView() {
  const [selectedCrop, setSelectedCrop] = useState("corn");
  const [timeframe, setTimeframe] = useState("30d");

  const predictions = [
    {
      crop: "Corn",
      currentPrice: "M 88.50",
      predictedPrice: "M 95.20",
      confidence: 94,
      change: "+7.57%",
      trend: "up",
      timeframe: "Next 30 days"
    },
    {
      crop: "Wheat",
      currentPrice: "M 72.30",
      predictedPrice: "M 68.40",
      confidence: 89,
      change: "-5.39%",
      trend: "down",
      timeframe: "Next 30 days"
    },
    {
      crop: "Beans",
      currentPrice: "M 100.20",
      predictedPrice: "M 108.80",
      confidence: 92,
      change: "+8.58%",
      trend: "up",
      timeframe: "Next 30 days"
    },
    {
      crop: "Potatoes",
      currentPrice: "M 55.80",
      predictedPrice: "M 62.10",
      confidence: 87,
      change: "+11.29%",
      trend: "up",
      timeframe: "Next 30 days"
    }
  ];

  const marketFactors = [
    {
      factor: "Seasonal Demand",
      impact: "High",
      description: "Harvest season approaching increases supply",
      trend: "positive"
    },
    {
      factor: "Weather Conditions",
      impact: "Medium",
      description: "Expected rainfall favorable for crop growth",
      trend: "positive"
    },
    {
      factor: "Transportation Costs",
      impact: "Medium",
      description: "Fuel price increases affecting logistics",
      trend: "negative"
    },
    {
      factor: "Regional Trade",
      impact: "Low",
      description: "Stable cross-border agricultural trade",
      trend: "neutral"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Price Predictions</h2>
          <p className="text-gray-600 mt-1">AI-powered forecasting for agricultural commodities</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedCrop} onValueChange={value => setSelectedCrop(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="beans">Beans</SelectItem>
              <SelectItem value="potatoes">Potatoes</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={value => setTimeframe(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {predictions.map((prediction, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{prediction.crop}</CardTitle>
                <Badge 
                  className={prediction.trend === "up" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                  }
                >
                  {prediction.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Current Price</p>
                  <p className="text-xl font-semibold">{prediction.currentPrice}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Predicted Price</p>
                  <p className="text-xl font-semibold text-blue-600">{prediction.predictedPrice}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className="text-lg font-semibold">{prediction.confidence}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{prediction.timeframe}</p>
                  </div>
                </div>
                
                {/* Confidence Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Price Prediction Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <PredictionChart crop={selectedCrop} timeframe={timeframe} />
            </CardContent>
          </Card>
        </div>

        {/* Market Factors */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Market Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketFactors.map((factor, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{factor.factor}</h4>
                    <Badge 
                      variant="outline" 
                      className={
                        factor.impact === "High" ? "border-red-200 text-red-700" :
                        factor.impact === "Medium" ? "border-yellow-200 text-yellow-700" :
                        "border-green-200 text-green-700"
                      }
                    >
                      {factor.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      factor.trend === "positive" ? "bg-green-500" :
                      factor.trend === "negative" ? "bg-red-500" :
                      "bg-gray-400"
                    }`}></div>
                    <span className="text-xs text-gray-500 capitalize">{factor.trend} impact</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Model Performance */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Model Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">7-day accuracy</span>
                <span className="font-semibold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">30-day accuracy</span>
                <span className="font-semibold text-green-600">89.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">90-day accuracy</span>
                <span className="font-semibold text-yellow-600">76.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Seasonal accuracy</span>
                <span className="font-semibold text-orange-600">68.1%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Price Alerts & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800">Buy Opportunity</h4>
              <p className="text-sm text-green-700 mt-1">Potatoes expected to rise 11% - consider purchasing now</p>
              <p className="text-xs text-green-600 mt-2">Confidence: 87%</p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800">Monitor Closely</h4>
              <p className="text-sm text-yellow-700 mt-1">Wheat prices volatile - wait for stabilization</p>
              <p className="text-xs text-yellow-600 mt-2">Confidence: 89%</p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800">Seasonal Trend</h4>
              <p className="text-sm text-blue-700 mt-1">Corn harvest season approaching - prices may fluctuate</p>
              <p className="text-xs text-blue-600 mt-2">Confidence: 94%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
