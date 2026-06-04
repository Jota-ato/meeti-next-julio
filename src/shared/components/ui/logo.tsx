import Image from "next/image";

export function Logo() {
    return (
        <Image
            src="/img/logo.svg"
            alt="Logotipo Meeti"
            width={200}
            height={200}
            title="Logotipo Meeti"
            loading="eager"
        />
    )
}