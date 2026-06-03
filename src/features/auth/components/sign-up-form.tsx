'use client'

import { Form } from "@/shared/components/forms/Form";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FieldGroup } from "@/shared/components/ui/field";
import { SignUpSchema, SignUpType } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldWLabel } from "@/shared/components/forms/FieldWLabel";
import { signUpAction } from "../actions/auth-actions";
import { toast } from "sonner";
import { Spinner } from "@/shared/components/ui/spinner";

type FieldConfig = {
    label: string
    id: keyof SignUpType
    type: string
    placeholder: string
}

const fields: FieldConfig[] = [
    { label: 'Nombre', id: 'name', type: 'text', placeholder: 'Ingresa tu nombre' },
    { label: 'E-mail', id: 'email', type: 'email', placeholder: 'Ingresa tu email' },
    { label: 'Contraseña', id: 'password', type: 'password', placeholder: 'Contraseña - Min. 8 caracteres' },
    { label: 'Repite contraseña', id: 'passwordConfirmation', type: 'password', placeholder: 'Repite tu contraseña' },
]

export function SignUpForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<SignUpType>({
        resolver: zodResolver(SignUpSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: SignUpType) => {
        const { success, message } = await signUpAction(data)

        if (success) {
            toast.success(message)
            reset()
        } else { 
            toast.error(message)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Crea tu cuenta</CardTitle>
            </CardHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <FieldGroup>
                        {fields.map(({ id, label, type, placeholder }) => (
                            <FieldWLabel
                                key={id}
                                id={id}
                                label={label}
                                type={type}
                                placeholder={placeholder}
                                error={errors[id]?.message}
                                {...register(id)}
                            />
                        ))}
                    </FieldGroup>
                </CardContent>
                <CardFooter className="mt-8">
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full disabled:cursor-not-allowed opacity-90"
                    >
                        {isSubmitting ? (
                            <p className="flex items-center gap-2">
                                <Spinner />
                                Creando...
                            </p>
                        ) : 'Crear cuenta'}
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    )
}