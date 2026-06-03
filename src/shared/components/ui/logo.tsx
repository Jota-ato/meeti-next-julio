import Image from "next/image";

export function Logo() {
    return (
        <Image
            src="/img/logo.svg"
            alt="Logotipo Meeti"
            width={100}
            height={100}
            title="Logotipo Meeti"
        />
    )
}