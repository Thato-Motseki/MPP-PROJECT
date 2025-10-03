import { ChevronLeft, ChevronRight } from "lucide-react";

export function MarketCalendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Market Calendar</h3>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-900">September 2024</span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {dates.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((date, dateIndex) => (
              <button
                key={dateIndex}
                className={`
                  h-8 text-sm flex items-center justify-center rounded
                  ${date === null ? "invisible" : ""}
                  ${date === 11 ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                {date}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <span className="text-gray-600">Market Day</span>
        </div>
      </div>
    </div>
  );
}
