import { MapPin, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LocationUpdates() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Location-Based Updates</h3>
      
      <div className="flex gap-6">
        {/* Map placeholder */}
        <div className="flex-1">
          <div className="bg-green-50 rounded-lg p-8 text-center border-2 border-dashed border-green-200">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-green-700 font-medium">Lesotho Market Map</p>
            <p className="text-green-600 text-sm mt-1">Regional price tracking</p>
          </div>
        </div>
        
        {/* Updates */}
        <div className="flex-1 space-y-4">
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Prices surging in your region</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Corn prices expected to rise this week
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">TM</span>
                  </div>
                  <span className="text-sm text-gray-500">Thato Motseki </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">New market center opened</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Maseru district now has improved access
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">SM</span>
                  </div>
                  <span className="text-sm text-gray-500">SmartMarket • Official</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}