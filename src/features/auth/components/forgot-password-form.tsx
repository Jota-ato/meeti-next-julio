"use client"
import { Form } from "@/shared/components/forms/Form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema, ForgotPasswordType } from "../schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { forgotPasswordAction } from "../actions/auth-actions";
import { Spinner } from "@/shared/components/ui/spinner";

export default function ForgotPasswordForm() {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ForgotPasswordType>({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: ForgotPasswordType) => {
        const { success, message } = await forgotPasswordAction(data)

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
                            <Field>
                                <FieldLabel htmlFor="email">
                                    E-mail
                                </FieldLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Ingresa tu E-mail"
                                    {...register('email')}
                                />
                            </Field>
                            {errors.email && (
                                <FieldError>
                                    {errors.email.message}
                                </FieldError>
                            )}
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
                            <p className="flex items-center gap-2">
                                <Spinner />
                                Enviando...
                            </p>
                        ) : 'Enviar instrucciones'}
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    )
}