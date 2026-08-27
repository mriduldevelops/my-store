import clsx from "clsx";

export default function PaginationButton({
  active = false,
  disabled = false,
  children,
  onClick,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-200",
        active
          ? "border-primary bg-primary text-white"
          : "border-border bg-white hover:border-primary hover:text-primary",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
}
