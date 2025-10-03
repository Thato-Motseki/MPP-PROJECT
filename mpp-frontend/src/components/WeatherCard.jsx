import { Cloud, Sun, CloudRain, Wind, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function WeatherCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-500" />
          Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold">22°C</p>
            <p className="text-sm text-gray-600">Partly Cloudy</p>
            <p className="text-xs text-gray-500">Maseru, Lesotho</p>
          </div>
          <Cloud className="w-12 h-12 text-gray-400" />
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Wind</p>
              <p className="text-xs text-gray-500">12 km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-xs text-gray-500">68%</p>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-3">3-Day Forecast</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Tomorrow</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">25°C / 18°C</p>
                <p className="text-xs text-gray-500">Sunny</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Thursday</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">19°C / 14°C</p>
                <p className="text-xs text-gray-500">Light Rain</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Friday</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">21°C / 16°C</p>
                <p className="text-xs text-gray-500">Cloudy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Impact */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm font-medium text-green-800">Farming Impact</p>
          <p className="text-xs text-green-700 mt-1">
            Good conditions for planting. Rain expected Thursday will benefit crops.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}