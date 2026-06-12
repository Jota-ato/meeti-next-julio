"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/forms/Form";
import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { UpdatePasswordSchema, UpdatePasswordType } from "../schemas/auth-schema";
import { toast } from "sonner";
import { updatePasswordAction } from "../actions/auth-actions";

export default function ChangePasswordForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdatePasswordType>({
        resolver: zodResolver(UpdatePasswordSchema),
    });

    const onSubmit = async (data: UpdatePasswordType) => {
        // TODO: llamar a tu API
        const { success, message } = await updatePasswordAction(data)

        if (success) {
            toast.success(message)
            reset()
        } else {
            toast.error(message)
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FieldWLabel
                    id="currentPassword"
                    label="Password Actual"
                    type="password"
                    placeholder="Escribe tu Password Actual"
                    error={errors.currentPassword?.message}
                    {...register("currentPassword")}
                />

                <FieldWLabel
                    id="newPassword"
                    label="Nuevo Password"
                    type="password"
                    placeholder="Nuevo Password"
                    error={errors.newPassword?.message}
                    {...register("newPassword")}
                />

                <FieldWLabel
                    id="passwordConfirmation"
                    label="Repetir Nuevo Password"
                    type="password"
                    placeholder="Repite el Nuevo Password"
                    error={errors.passwordConfirmation?.message}
                    {...register("passwordConfirmation")}
                />

                <div className="flex items-center gap-3">
                    <label htmlFor="revokeOtherSessions" className="text-sm font-medium">
                        Cerrar sesión en todos los dispositivos
                    </label>
                    <input
                        id="revokeOtherSessions"
                        type="checkbox"
                        className="accent-orange-500 size-5"
                        {...register("revokeOtherSessions")}
                    />
                </div>

                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Cambiar Password"
                    loadingLabel="Guardando..."
                />
            </Form>
        </>
    );
}