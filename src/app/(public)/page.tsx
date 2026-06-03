import { Hero } from "@/shared/components/ui/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Inicio'
}

export default function Home() {
    return (
        <div>
            <Hero />
        </div>
    )
}