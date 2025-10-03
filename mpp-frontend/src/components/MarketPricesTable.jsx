import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const marketData = [
  { product: "Corn", district: "Berea", price: "M65", trend: "up" },
  { product: "Wheat", district: "Quthing", price: "M40", trend: "down" },
  { product: "Cattle", district: "Qacha's Nek", price: "M1200", trend: "up" },
  { product: "Sheep", district: "Mohale's Hoek", price: "M500", trend: "down" },
  { product: "Potatoes", district: "Maseru", price: "M25", trend: "up" },
  { product: "Beans", district: "Mafeteng", price: "M80", trend: "up" },
];

export function MarketPricesTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Real-Time Market Prices</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm">
              Product <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm">
              District <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm">
              Market Center <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.product}</TableCell>
                <TableCell>{item.district}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  {item.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}