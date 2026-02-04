import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";

type StatusType = "paid" | "pending" | "overdue" | "critical";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  paid: {
    label: "Al día",
    icon: CheckCircle2,
    className: "status-paid",
  },
  pending: {
    label: "Pendiente",
    icon: Clock,
    className: "status-pending",
  },
  overdue: {
    label: "Vencido",
    icon: AlertTriangle,
    className: "status-overdue",
  },
  critical: {
    label: "Crítico",
    icon: XCircle,
    className: "status-critical",
  },
};

export function StatusBadge({
  status,
  label,
  showIcon = true,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn(config.className, className)}>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {label || config.label}
    </span>
  );
}
