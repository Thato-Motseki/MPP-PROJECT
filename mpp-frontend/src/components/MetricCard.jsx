import { cn } from "./ui/utils";

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
  className,
}) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 border",
        variant === "green"
          ? "bg-green-600 text-white border-green-600"
          : "bg-white border-gray-200",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={cn(
            "font-medium",
            variant === "green" ? "text-white" : "text-gray-600"
          )}
        >
          {title}
        </h3>
        {Icon && (
          <Icon
            className={cn(
              "w-5 h-5",
              variant === "green" ? "text-green-200" : "text-gray-400"
            )}
          />
        )}
      </div>

      <div className="space-y-2">
        <div
          className={cn(
            "text-3xl font-bold",
            variant === "green" ? "text-white" : "text-gray-900"
          )}
        >
          {value}
        </div>

        {subtitle && (
          <p
            className={cn(
              "text-sm",
              variant === "green" ? "text-green-100" : "text-gray-500"
            )}
          >
            {subtitle}
          </p>
        )}

        {trend && trendValue && (
          <div className="flex items-center gap-1">
            <span
              className={cn(
                "text-sm",
                trend === "up" ? "text-green-500" : "text-red-500",
                variant === "green" && "text-green-200"
              )}
            >
              {trend === "up" ? "↗" : "↘"} {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
