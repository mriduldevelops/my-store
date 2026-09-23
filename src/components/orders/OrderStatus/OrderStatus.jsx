import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Order Pending",
    icon: Clock3,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },

  confirmed: {
    label: "Order Confirmed",
    icon: CheckCircle2,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },

  processing: {
    label: "Processing",
    icon: PackageCheck,
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },

  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },

  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-700 border-green-200",
  },

  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function OrderStatus({ status = "pending" }) {
  const config = statusConfig[status] ?? statusConfig.pending;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}
