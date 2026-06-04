"use client"

import { Form } from "@/shared/components/forms/Form";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Spinner } from "@/shared/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema, ResetPasswordType } from "../schemas/auth-schema";
import { redirect, useSearchParams } from "next/navigation";

export function SetPasswordForm() {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    if (!token) redirect('/auth/forgot-password')
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordType>({
        resolver: zodResolver(ResetPasswordSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: ResetPasswordType) => { 

    }

    return (
        <Card>
            <Form
                onSubmit={handleSubmit(onSubmit)}
            >
                <CardContent>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="newPassword">
                                    Nueva contraseña
                                </FieldLabel>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    {...register('newPassword')}
                                />

                                {errors.newPassword && (
                                    <FieldError>
                                        {errors.newPassword.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="passwordConfirmation">
                                    Confirmar contraseña
                                </FieldLabel>
                                <Input
                                    id="passwordConfirmation"
                                    type="password"
                                    {...register('passwordConfirmation')}
                                />
                                {errors.passwordConfirmation && (
                                    <FieldError>
                                        {errors.passwordConfirmation.message}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full disabled:cursor-not-allowed opacity-90"
                        >
                            {isSubmitting ? (
                                <p className="flex items-center gap-2">
                                    <Spinner />
                                    Restableciendo...
                                </p>
                            ) : 'Restablecer contraseña'}
                        </Button>
                    </FieldSet>
                </CardContent>
            </Form>
        </Card>
    )
}