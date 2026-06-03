import { z } from "zod";

const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, { error: 'El nombre es obligatorio' }),
    email: z.email({ error: 'E-mail no válido' }),
    password: z.string()
        .trim()
        .min(8, { error: 'Mínimo 8 caracteres en la contraseña' })
        .regex(/[A-Z]/, { error: 'Debe contener al menos una mayúscula' })
        .regex(/[^a-zA-Z0-9]/, { error: 'Debe contener al menos un carácter especial' }),
})

export const SignInSchema = BaseAuthSchema.pick({
    email: true,
    password: true,
})

export type SignInType = z.infer<typeof SignInSchema>

export const SignUpSchema = BaseAuthSchema.extend({
    passwordConfirmation: z.string().min(1, { error: 'Confirma tu contraseña' })
}).refine(
    (data) => data.password === data.passwordConfirmation,
    {
        error: 'Las contraseñas no coinciden',
        path: ['passwordConfirmation']
    }
)

export type SignUpType = z.infer<typeof SignUpSchema>