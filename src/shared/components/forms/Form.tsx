import { FormHTMLAttributes, ReactNode } from "react";

type Props = {
    children: ReactNode
} & FormHTMLAttributes<HTMLFormElement>

export function Form({ className, children, ...formProps }: Props) {
    return (
        <form
            className={className}
            {...formProps}
        >
            {children}
        </form>
    )
}