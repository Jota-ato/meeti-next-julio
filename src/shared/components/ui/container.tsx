import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Container({
    children,
    className
}: {
    children: ReactNode
    className?: string 
}) {
    return (
        <div className={cn("w-[90%] max-w-6xl mx-auto", className)}>
            {children}
        </div>
    )
}