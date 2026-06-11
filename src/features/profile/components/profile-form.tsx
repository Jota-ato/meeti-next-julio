"use client"

import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { Form } from "@/shared/components/forms/Form";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import {
    Field,
    FieldSet
} from "@/shared/components/ui/field";
import ImageUploader from "@/shared/components/upload/image-uploader";
import { useForm } from "react-hook-form";
import { ProfileSchema, ProfileType } from "../schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/features/auth/types/auth.types";
import { toast } from "sonner";
import { updateProfileAction } from "../actions/profile-actions";

type FieldConfig = {
    id: keyof Omit<ProfileType, "image">;
    label: string;
    type: string;
    placeholder?: string;
};

const fields: FieldConfig[] = [
    { id: "name", label: "Nombre:", type: "text", placeholder: "Tu nombre" },
    { id: "bio", label: "Biografía", type: "textarea", placeholder: "Añade una Descripción o Biografía" },
];

export function ProfileForm({
    user
}: {
    user: User
}) {

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        mode: 'all',
        defaultValues: {
            name: user.name,
            bio: user.bio ? user.bio : '',
            image: user.image ? user.image : ''
        }
    })

    const onSubmit = async (data: ProfileType) => { 
        const response = await updateProfileAction(data)
        if (!response.success) {
            toast.error(response.message)
        } else { 
            toast.success(response.message)
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FieldSet>
                {fields.map(({ id, label, type, placeholder }) => (
                    <FieldWLabel
                        key={id}
                        id={id}
                        label={label}
                        placeholder={placeholder}
                        {...(type === "textarea" ? { textarea: true } : { type })}
                        error={errors[id]?.message}
                        {...register(id)}
                    />
                ))}

                <Field>
                    <ImageUploader
                        image={user.image ? user.image : ''}
                        onChange={(url) => setValue("image", url || "", { shouldValidate: true })}
                        label="Imagen de perfil"
                    />
                </Field>

                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Guardar cambios"
                    loadingLabel="Guardando..."
                />
            </FieldSet>
        </Form>
    )
}
