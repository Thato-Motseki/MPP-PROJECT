import { Search, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function TopNavigation() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and breadcrumb */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Agricultural Market Intelligencecd </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">Dashboard</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-green-600">Live Market Data</span>
          </div>
        </div>

        {/* Right side - Search, notifications, profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search markets, crops..."
              className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              3
            </Badge>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <Avatar className="w-9 h-9">
              <AvatarImage src="" />
              <AvatarFallback className="bg-green-100 text-green-700">TM</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Thato Motseki</p>
              <p className="text-xs text-gray-500">Farm Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}