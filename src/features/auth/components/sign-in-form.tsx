"use client"

import { Form } from "@/shared/components/forms/Form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "react-hook-form";
import { SignInSchema, SignInType } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldWLabel } from "@/shared/components/forms/FieldWLabel";
import { Spinner } from "@/shared/components/ui/spinner";

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

    const onSubmit = (data: SignInType) => {
        setTimeout(() => { 
            console.log(data)
        }, 2000)
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
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full disabled:cursor-not-allowed opacity-90"
                    >
                        {isSubmitting ? (
                            <p>
                                <Spinner />
                                Entrando...
                            </p>
                        ) : 'Iniciar sesión'}
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    )
}