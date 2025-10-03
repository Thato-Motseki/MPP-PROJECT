import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  AlertTriangle,
  Calendar,
  MapPin,
  Cloud
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { PriceChart } from "./PriceChart";
import { MarketTable } from "./MarketTable";
import { WeatherCard } from "./WeatherCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MainDashboard() {
  const statsCards = [
    {
      title: "Total Markets",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Activity,
      description: "Active trading centers"
    },
    {
      title: "Average Price",
      value: "M 45.60",
      change: "+5.2%",
      trend: "up",
      icon: DollarSign,
      description: "Per kg across all crops"
    },
    {
      title: "Price Volatility",
      value: "8.4%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingDown,
      description: "Weekly fluctuation"
    },
    {
      title: "Price Alerts",
      value: "18",
      change: "+6",
      trend: "up",
      icon: AlertTriangle,
      description: "Requiring attention"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Good morning, Thato! 🌅</h2>
            <p className="text-green-100">
              Here's what's happening with agricultural markets today
            </p>
          </div>
          <div className="text-right">
            <p className="text-green-100 text-sm">Thursday</p>
            <p className="text-xl font-semibold">Oct 02, 2025</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={stat.trend === "up" ? "default" : "secondary"}
                  className={
                    stat.trend === "up"
                      ? "bg-green-300 text-green-700 hover:bg-green-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  }
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price Trends Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Price Trends</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">30 Days</Badge>
                  <Badge variant="outline">90 Days</Badge>
                  <Badge>1 Year</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PriceChart />
            </CardContent>
          </Card>

          {/* Market Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Live Market Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketTable />
            </CardContent>
          </Card>

          {/* Featured Market Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1634729609724-755326675bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwZmllbGQlMjBoYXJ2ZXN0fGVufDF8fHx8MTc1OTI1MTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Corn harvest"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="p-4">
                      <h4 className="text-white font-medium">Corn Season Update</h4>
                      <p className="text-gray-200 text-sm">Harvest begins next week</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1740741703636-1680d0c0f0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU5MzI4NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="African farmer"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="p-4">
                      <h4 className="text-white font-medium">Farming in Lesotho</h4>
                      <p className="text-gray-200 text-sm">Supporting local agriculture</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Info */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <WeatherCard />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Market Calendar</p>
                  <p className="text-sm text-gray-500">View upcoming events</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Location Tracker</p>
                  <p className="text-sm text-gray-500">Find nearby markets</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">Price Predictions</p>
                  <p className="text-sm text-gray-500">AI-powered forecasts</p>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Corn prices updated</p>
                  <p className="text-xs text-gray-500">Maseru Market • 2m ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">New weather alert</p>
                  <p className="text-xs text-gray-500">Rain expected • 15m ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Price alert triggered</p>
                  <p className="text-xs text-gray-500">Wheat +15% • 1h ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
