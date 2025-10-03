import { 
  LayoutDashboard, 
  TrendingUp, 
  ShoppingCart, 
  MapPin, 
  Cloud, 
  Settings, 
  HelpCircle,
  Smartphone,
  Leaf
} from "lucide-react";

export function Sidebar({ activeView, onViewChange }) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "predictions", icon: TrendingUp, label: "Price Predictions" },
    { id: "market", icon: ShoppingCart, label: "Market Data" },
    { id: "locations", icon: MapPin, label: "Locations" },
    { id: "weather", icon: Cloud, label: "Weather" },
  ];

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help Center" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-800 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">SmartMarket Lesotho</h1>
            <p className="text-xs text-gray-500"> Your Price Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeView === item.id
                ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
        
        {/* Mobile App Promotion */}
        <div className="mt-10 p-4 bg-gradient-to-br from-green-600 to-green-600 rounded-xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-5 h-5" />
            <span className="font-medium">Mobile App</span>
          </div>
          <p className="text-sm text-green-100 mb-3">Get real-time updates on the go</p>
          <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg py-2 px-3 text-sm font-medium transition-colors">
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
}