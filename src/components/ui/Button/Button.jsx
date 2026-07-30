import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-white hover:opacity-90",

  secondary:
    "bg-secondary text-white hover:opacity-90",

  outline:
    "border border-border bg-white hover:bg-gray-100",

  ghost:
    "hover:bg-gray-100",

  link:
    "underline underline-offset-4",
};

const sizes = {
  sm: "h-9 px-3 text-sm",

  md: "h-11 px-5",

  lg: "h-12 px-7",

  icon: "h-10 w-10",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  leftIcon,
  rightIcon,
  loading,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading}
      {...props}
    >
      {leftIcon}

      {loading ? "Loading..." : children}

      {rightIcon}
    </button>
  );
}