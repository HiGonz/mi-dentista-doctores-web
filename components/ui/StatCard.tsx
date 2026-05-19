import { cn, formatCurrency } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: { value: number; label: string };
  isCurrency?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary-light",
  trend,
  isCurrency = false,
  className,
}: StatCardProps) {
  const displayValue =
    isCurrency && typeof value === "number" ? formatCurrency(value) : value;

  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="text-xl font-bold text-neutral-900 sm:text-2xl">
            {displayValue}
          </p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.value >= 0 ? "text-secondary-dark" : "text-danger",
              )}
            >
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
              {trend.label}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12",
            iconBg,
          )}
        >
          <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
