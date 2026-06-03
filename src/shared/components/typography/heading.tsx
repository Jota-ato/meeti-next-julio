import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

type Props = {
    children: ReactNode
    level?: 1 | 2 | 3 | 4 | 5 | 6
    className?: string
}

export function Heading({ children, level = 1, className }: Props) {

    const Tag: ElementType = `h${level}`

    const sizeMap: Record<number, string> = {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
        4: 'text-xl',
        5: 'text-lg',
        6: 'text-sm',
    }
    
    return (
        <Tag className={cn(
            "font-black uppercase text-3xl md:text-4xl text-center",
            sizeMap[level], className
        )}>
            {children}
        </Tag>
    )
}