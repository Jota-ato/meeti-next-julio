import { Heading } from "@/shared/components/typography/heading";
import { Metadata } from "next";
import Link from "next/link";


const title = 'Crea comunidades'

export const metadata: Metadata = {
    title
}

export default function CreateCommunitiePage() {
    return (
        <>
            <Heading>
                {title}
            </Heading>
            <div className="w-[90%] max-w-6xl mx-auto">
                <Link
                    href="/dashboard/communities"
                    className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
                >
                    Volver a mis Comunidades
                </Link>
            </div>
        </>
    )
}