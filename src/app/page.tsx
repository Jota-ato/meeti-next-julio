import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Inicio</h1>
            <Link
                href="/about-us"
            >
                Ir a nosotros
            </Link>
        </div>
    )
}
