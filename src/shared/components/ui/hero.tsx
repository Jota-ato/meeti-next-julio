import Link from "next/link";
import { Button } from "./button";

export function Hero() {
    return (
        <section className="bg-hero min-h-150 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-4/5 max-w-2xl gap-8">
                <h1 className="text-3xl lg:text-4xl text-white uppercase font-black text-center">Encuentra Un Meeti o Crea una Comunidad para
                    compartir lo que más te gusta</h1>
                <Button
                    size={'lg'}
                    className="text-xl sm:text-2xl"
                    asChild
                >
                    <Link
                        href="/auth/sign-up"
                    >
                        Obtener una cuenta
                    </Link>
                </Button>
            </div>
        </section>
    )
}