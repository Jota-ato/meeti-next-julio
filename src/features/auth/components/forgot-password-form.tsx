"use client"
import { Form } from "@/shared/components/forms/Form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema, ForgotPasswordType } from "../schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { forgotPasswordAction } from "../actions/auth-actions";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { FieldWLabel } from "@/shared/components/forms/field-w-label";

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
                            <FieldWLabel
                                label="E-mail"
                                id="email"
                                placeholder="Ingresa tu E-mail"
                                {...register('email')}
                                error={errors.email?.message}
                            />
                        </FieldGroup>
                    </FieldSet>
                </CardContent>
                <CardFooter className="mt-8">
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        label="Enviar instrucciones"
                        loadingLabel="Enviando..."
                    />
                </CardFooter>
            </Form>
        </Card>
    )
}