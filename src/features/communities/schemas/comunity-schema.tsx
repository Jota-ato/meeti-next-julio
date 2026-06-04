import z from "zod";

export const CommunitySchema = z.object({
    name: z.string()
        .min(3, { message: 'El Titulo de la Comunidad es Obligatorio' }),
    description: z.string()
        .min(10, { message: 'La Descripción es obligatoria' })
})

export type CommunityType = z.infer<typeof CommunitySchema>