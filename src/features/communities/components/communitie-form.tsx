"use client"

import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { Form } from "@/shared/components/forms/Form";
import { FieldError, FieldSet } from "@/shared/components/ui/field";
import { useForm } from "react-hook-form";
import { CommunitySchema, CommunityType } from "../schemas/comunity-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { createCommunityAction } from "../actions/community-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import ImageUploader from "@/shared/components/upload/image-uploader";

type fieldType = {
    label: string
    id: keyof CommunityType
    placeholder: string
    textArea?: boolean
}

const fields: fieldType[] = [
    { label: "Nombre de la Comunidad", id: "name", placeholder: "Título de comunidad" },
    { label: "Descripción comunidad", id: "description", placeholder: "Descripción comunidad", textArea: true },
]

export function CommunitieForm() {

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<CommunityType>({
        resolver: zodResolver(CommunitySchema),
        mode: 'all'
    })

    const onSubmit = async (data: CommunityType) => {
        const { success, message } = await createCommunityAction(data)

        if (!success) toast.error(message)
        else {
            toast.success(message)
            reset()
            redirect('/dashboard/communities')
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                    {fields.map(field => (
                        <FieldWLabel
                            key={field.id}
                            label={field.label}
                            id={field.id}
                            {...register(field.id)}
                            error={errors[field.id]?.message}
                            textarea={field.textArea}
                        />
                    ))}
                    <ImageUploader
                        onChange={(url) => setValue("image", url || "", { shouldValidate: true })}
                        label="Imagen de comunidad"
                    />
                    {errors.image &&
                        <FieldError>
                            {errors.image.message}
                        </FieldError>
                    }
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        label="Crear comunidad"
                        loadingLabel="Creando..."
                    />
                </FieldSet>
            </Form>
        </>
    )
}