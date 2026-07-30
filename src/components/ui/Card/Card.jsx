import { cn } from "@/lib/utils";

export default function Card({
    children,
    className
}) {
    return (
        <div
            className={cn(
                "rounded-xl border bg-white p-6 shadow-sm",
                className
            )}
        >
            {children}
        </div>
    );
}