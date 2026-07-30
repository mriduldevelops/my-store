import { cn } from "@/lib/utils";

export default function Section({
    children,
    className
}) {
    return (
        <section
            className={cn(
                "py-20",
                className
            )}
        >
            {children}
        </section>
    );
}