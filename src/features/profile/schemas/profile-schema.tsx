import z from "zod";

export const ProfileSchema = z.object({
    name: z.string()
        .min(3, { message: 'Tu nombre es Obligatorio' }),
    bio: z.string()
        .min(1, { message: 'Añade una descripción o biografía' }),
    image: z.string({ message: 'La imagen es obligatoria' }),
})

export type ProfileType = z.infer<typeof ProfileSchema>