import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

const variantStyles = {
  default: {
    icon: "bg-primary/10 text-primary",
    trend: {
      positive: "bg-success-light text-success",
      negative: "bg-danger-light text-danger",
    },
  },
  success: {
    icon: "bg-success-light text-success",
    trend: {
      positive: "bg-success-light text-success",
      negative: "bg-danger-light text-danger",
    },
  },
  warning: {
    icon: "bg-warning-light text-warning",
    trend: {
      positive: "bg-success-light text-success",
      negative: "bg-danger-light text-danger",
    },
  },
  danger: {
    icon: "bg-danger-light text-danger",
    trend: {
      positive: "bg-success-light text-success",
      negative: "bg-danger-light text-danger",
    },
  },
  info: {
    icon: "bg-info-light text-info",
    trend: {
      positive: "bg-success-light text-success",
      negative: "bg-danger-light text-danger",
    },
  },
};

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  variant = "default",
  className,
}: KPICardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "card-elevated p-6 flex flex-col gap-4 animate-fade-in",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="kpi-label">{title}</p>
          <p className="kpi-value mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("p-3 rounded-xl", styles.icon)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full",
              trend.isPositive ? styles.trend.positive : styles.trend.negative
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend.value}%
          </span>
          {trend.label && (
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
}
