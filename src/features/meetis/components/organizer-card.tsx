import { User } from "@/features/auth/types/auth.types";
import { Heading } from "@/shared/components/typography/heading";
import Image from "next/image";

export function OrganizerCard({
    image,
    organizer
}: {
    image: string
    organizer: User
}) {

    return (
        <>
            <Heading level={2} className='text-center'>Organizador</Heading>
            <div className="grid grid-cols-4 items-center gap-3 mt-5">
                <div className="relative mx-auto aspect-square overflow-hidden rounded-full border border-gray-200 bg-white flex items-center justify-center">
                    <Image
                        src={image ? image : '/img/default.jpg'}
                        alt="Imagen Perfil"
                        width={300}
                        height={300}
                        className="object-cover"
                    />
                </div>
                <div className="col-span-3 space-y-3">
                    <p className="text-lg font-black">{organizer.name}</p>
                    <p className="text-gray-500 text-sm"></p>
                    {/**To do */}
                    <a
                        className="font-bold text-sm bg-pink-600 p-2  text-white block w-full text-center"
                    >Ver Perfil</a>
                </div>
            </div>
        </>
    )
}