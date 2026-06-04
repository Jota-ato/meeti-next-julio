import Image from "next/image";

interface Props { 
    width?: number
    height?: number
    className?: string
}

export function Logo({ width = 100, height = 100, className} : Props) {
    return (
        <Image
            src="/img/logo.svg"
            alt="Logotipo Meeti"
            width={width}
            height={height}
            title="Logotipo Meeti"
            loading="eager"
            className={className}
        />
    )
}