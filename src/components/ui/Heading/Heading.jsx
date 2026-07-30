import { cn } from "@/lib/utils";

export default function Heading({
    title,
    subtitle,
    center,
}) {
    return (
        <div
            className={cn(
                "mb-12",
                center && "text-center"
            )}
        >
            <h2 className="text-4xl font-bold">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-4 text-gray-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}