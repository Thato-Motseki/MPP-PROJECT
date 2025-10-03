import { Cloud, Sun, CloudRain } from "lucide-react";

export function WeatherWidget() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">Monday</p>
          <p className="text-gray-500 text-xs">20 September 2024</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-gray-400" />
            <span className="text-2xl font-bold text-gray-900">21°C</span>
          </div>
          <p className="text-gray-600 text-sm">Cloudy</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">Next few days</p>
        <div className="flex justify-between mt-2">
          <div className="text-center">
            <Sun className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">19°</p>
          </div>
          <div className="text-center">
            <CloudRain className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">16°</p>
          </div>
          <div className="text-center">
            <Sun className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">22°</p>
          </div>
        </div>
      </div>
    </div>
  );
}