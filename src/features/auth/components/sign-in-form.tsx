"use client"

import { Form } from "@/shared/components/forms/Form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { useForm } from "react-hook-form";
import { SignInSchema, SignInType } from "../schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { signInAction } from "../actions/auth-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/shared/components/forms/submit-button";

type FieldConfig = {
    label: string
    id: keyof SignInType
    type: string
    placeholder: string
}


const fields: FieldConfig[] = [
    {
        label: 'E-mail', id: 'email', type: 'email', placeholder: 'Ingresa tu email'
    },
    {
        label: 'Contraseña', id: 'password', type: 'password', placeholder: 'Ingresa tu contraseña'
    },
]

export function SignInForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<SignInType>({
        resolver: zodResolver(SignInSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: SignInType) => {
        const { success, message } = await signInAction(data)

        if (success) {
            toast.success(message)
            reset()
            redirect('/dashboard')
        } else { 
            toast.error(message)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Entra a tu cuenta
                </CardTitle>
                <CardDescription className="sr-only">
                    Sign-in
                </CardDescription>
            </CardHeader>
            <Form
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardContent>
                    <FieldSet>
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
                    </FieldSet>
                </CardContent>
                <CardFooter className="mt-8">
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        loadingLabel="Iniciando..."
                        label="Iniciar sesión"
                    />
                </CardFooter>
            </Form>
        </Card>
    )
}