import { useState } from "react";
import { MapPin, Search, Filter, Calendar, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MarketTable } from "./MarketTable";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MarketView() {
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedCrop, setSelectedCrop] = useState("all");

  const marketCenters = [
    {
      name: "Maseru Central Market",
      district: "Maseru",
      location: "Ha Abia, Maseru",
      vendors: 45,
      avgPrice: "M 67.50",
      status: "Active",
      lastUpdate: "2 min ago",
      image: "https://images.unsplash.com/photo-1583670405788-74ac9d2b84a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwbWFya2V0JTIwc3RhbGx8ZW58MXx8fHwxNzU5MzI4NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Berea District Market",
      district: "Berea",
      location: "Teyateyaneng",
      vendors: 32,
      avgPrice: "M 72.20",
      status: "Active",
      lastUpdate: "5 min ago",
      image: "https://images.unsplash.com/photo-1583670405788-74ac9d2b84a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwbWFya2V0JTIwc3RhbGx8ZW58MXx8fHwxNzU5MzI4NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Mafeteng Market",
      district: "Mafeteng",
      location: "Mafeteng Town",
      vendors: 28,
      avgPrice: "M 69.80",
      status: "Active",
      lastUpdate: "8 min ago",
      image: "https://images.unsplash.com/photo-1583670405788-74ac9d2b84a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwbWFya2V0JTIwc3RhbGx8ZW58MXx8fHwxNzU5MzI4NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Qacha's Nek Market",
      district: "Qacha's Nek",
      location: "Qacha's Nek Town",
      vendors: 18,
      avgPrice: "M 74.30",
      status: "Limited",
      lastUpdate: "15 min ago",
      image: "https://images.unsplash.com/photo-1583670405788-74ac9d2b84a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwbWFya2V0JTIwc3RhbGx8ZW58MXx8fHwxNzU5MzI4NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Thaba-Tseka Market",
      district: "Thaba-Tseka",
      location: "Thaba-Tseka Town",
      vendors: 22,
      avgPrice: "M 71.60",
      status: "Active",
      lastUpdate: "12 min ago",
      image: "https://images.unsplash.com/photo-1583670405788-74ac9d2b84a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwbWFya2V0JTIwc3RhbGx8ZW58MXx8fHwxNzU5MzI4NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Mohale's Hoek Market",
      district: "Mohale's Hoek",
      location: "Mohale's Hoek Town",
      vendors: 35,
      avgPrice: "M 68.90",
      status: "Active",
      lastUpdate: "3 min ago",
      image: "https://images.unsplash.com/photo-1583670405788-74ac9d2b84a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwbWFya2V0JTIwc3RhbGx8ZW58MXx8fHwxNzU5MzI4NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const marketStats = [
    {
      title: "Active Markets",
      value: "247",
      subtitle: "Across all districts",
      icon: MapPin,
      color: "text-blue-600"
    },
    {
      title: "Weekly Growth",
      value: "+8.3%",
      subtitle: "Price increases",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Total Vendors",
      value: "1,248",
      subtitle: "Registered sellers",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Market Days",
      value: "156",
      subtitle: "This month",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Market Centers</h2>
          <p className="text-gray-600 mt-1">Comprehensive market data across Lesotho</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Market Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search markets, locations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="maseru">Maseru</SelectItem>
                <SelectItem value="berea">Berea</SelectItem>
                <SelectItem value="mafeteng">Mafeteng</SelectItem>
                <SelectItem value="qacha">Qacha's Nek</SelectItem>
                <SelectItem value="thaba">Thaba-Tseka</SelectItem>
                <SelectItem value="mohale">Mohale's Hoek</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="beans">Beans</SelectItem>
                <SelectItem value="potatoes">Potatoes</SelectItem>
                <SelectItem value="sorghum">Sorghum</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Market Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketCenters.map((market, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <ImageWithFallback
                src={market.image}
                alt={market.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge 
                  className={market.status === "Active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {market.status}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{market.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{market.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Vendors</p>
                    <p className="font-semibold">{market.vendors}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Price</p>
                    <p className="font-semibold">{market.avgPrice}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Updated {market.lastUpdate}</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Market Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Market Data</CardTitle>
        </CardHeader>
        <CardContent>
          <MarketTable />
        </CardContent>
      </Card>
    </div>
  );
}