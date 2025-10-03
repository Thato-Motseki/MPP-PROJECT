import { TrendingUp, TrendingDown, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const marketData = [
  {
    product: "Corn",
    location: "Maseru Central Market",
    currentPrice: "M 88.50",
    previousPrice: "M 85.20",
    change: "+3.87%",
    trend: "up",
    volume: "1,240 kg",
    quality: "Grade A"
  },
  {
    product: "Wheat",
    location: "Berea District Market",
    currentPrice: "M 72.30",
    previousPrice: "M 75.10",
    change: "-3.73%",
    trend: "down",
    volume: "890 kg",
    quality: "Grade B"
  },
  {
    product: "Beans",
    location: "Mafeteng Market",
    currentPrice: "M 100.20",
    previousPrice: "M 98.50",
    change: "+1.73%",
    trend: "up",
    volume: "650 kg",
    quality: "Grade A"
  },
  {
    product: "Potatoes",
    location: "Qacha's Nek Market",
    currentPrice: "M 55.80",
    previousPrice: "M 52.40",
    change: "+6.49%",
    trend: "up",
    volume: "2,100 kg",
    quality: "Grade A"
  },
  {
    product: "Sorghum",
    location: "Thaba-Tseka Market",
    currentPrice: "M 67.90",
    previousPrice: "M 69.20",
    change: "-1.88%",
    trend: "down",
    volume: "420 kg",
    quality: "Grade B"
  },
  {
    product: "Cabbage",
    location: "Maseru Central Market",
    currentPrice: "M 25.60",
    previousPrice: "M 24.80",
    change: "+3.23%",
    trend: "up",
    volume: "1,800 kg",
    quality: "Grade A"
  }
];

export function MarketTable() {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold text-right">Current Price</TableHead>
            <TableHead className="font-semibold text-right">Change</TableHead>
            <TableHead className="font-semibold text-right">Volume</TableHead>
            <TableHead className="font-semibold">Quality</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {marketData.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <div className="font-medium">{item.product}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{item.location}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="font-semibold">{item.currentPrice}</div>
                <div className="text-xs text-gray-500">was {item.previousPrice}</div>
              </TableCell>
              <TableCell className="text-right">
                <Badge 
                  variant={item.trend === "up" ? "default" : "secondary"}
                  className={item.trend === "up" 
                    ? "bg-green-100 text-green-700 hover:bg-green-100" 
                    : "bg-red-100 text-red-700 hover:bg-red-100"
                  }
                >
                  {item.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {item.change}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm text-gray-600">
                {item.volume}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={
                  item.quality === "Grade A" 
                    ? "border-green-200 text-green-700" 
                    : "border-amber-200 text-amber-700"
                }>
                  {item.quality}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}