"use client"

import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { Form } from "@/shared/components/forms/Form";
import { FieldError, FieldSet } from "@/shared/components/ui/field";
import { CommunityFormSelect } from "./community-form-select";
import { useForm } from "react-hook-form";
import { CommunitiesForMeetiType } from "@/features/communities/types/community.types";
import { SelectCategory } from "../types/meeti.types";
import { CategoryFormSelect } from "./category-form-select";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeetiSchema, MeetiType } from "../schemas/meeti-schema"
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { VirtualSwitch } from "./virtual-switch";
import ImageUploader from "@/shared/components/upload/image-uploader";
import { createMeetiAction } from "../actions/meeti-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type FieldConfig = {
    id: keyof MeetiType;
    label: string;
    type: string;
    placeholder?: string;
    min?: number;
    step?: number;
};

const mainFields: FieldConfig[] = [
    { id: "title", label: "Nombre Meeti", type: "text", placeholder: "Título Meeti" },
    { id: "details", label: "Detalles Meeti", type: "textarea", placeholder: "Descripción Meeti" },
    { id: "availableSeats", label: "Cupo", type: "number", placeholder: "Cupo Disponible", min: 1 },
];

const dateTimeFields: FieldConfig[] = [
    { id: "date", label: "Fecha:", type: "date" },
    { id: "time", label: "Hora:", type: "time", step: 1800 },
];

const DynamicLocationPicker = dynamic(() => import('./location-picker'), { ssr: false })

export function MeetiForm({
    communities,
    categories
}: {
    communities: CommunitiesForMeetiType[][],
    categories: SelectCategory[]
}) {

    const {
        control,
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<MeetiType>({
        resolver: zodResolver(MeetiSchema),
        mode: 'all',
        defaultValues: {
            title: '',
            details: '',
            categoryId: '',
            communityId: '',
            availableSeats: 0,
            date: '',
            time: '',
            image: '',
            virtual: false,
            location: {
                placeName: '',
                address: '',
                city: '',
                country: '',
                lat: 19.4355654,
                lng: -99.153843
            }
        }
    })

    // eslint-disable-next-line react-hooks/incompatible-library
    const isVirtual = watch('virtual')

    const onSubmit = async (data: MeetiType) => {
        const response = await createMeetiAction({...data})
        if (!response.success) {
            toast.error(response.message)
        } else { 
            toast.success(response.message)
            reset()
            redirect('/dashboard/meetis')
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
                {mainFields.map((field) => (
                    <FieldWLabel
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        type={field.type}
                        error={errors[field.id]?.message}
                        {...register(field.id)}
                    />
                ))}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {dateTimeFields.map((field) => (
                        <FieldWLabel
                            key={field.id}
                            {...field}
                            error={errors[field.id]?.message}
                            {...register(field.id)}
                        />
                    ))}
                </div>

                <CategoryFormSelect categories={categories} control={control} />
                <CommunityFormSelect communities={communities} control={control} />

                <VirtualSwitch control={control} />

                {!isVirtual && (
                    <>
                        <p className="font-black text-4xl mb-5">Ubicación Meeti</p>

                        <FieldWLabel
                            label="Nombre del lugar:"
                            id="location.placeName"
                            {...register('location.placeName')}
                            error={'location' in errors ? errors.location?.placeName?.message : ''}
                        />

                        <DynamicLocationPicker getValues={getValues} register={register} setValue={setValue} />
                    </>
                )}

                <ImageUploader
                    onChange={(url) => setValue("image", url || "", { shouldValidate: true })}
                    label="Imagen del meeti"
                    image={''}
                />

                {errors.image && (
                    <FieldError>
                        {errors.image.message}
                    </FieldError>
                )}

                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Crear Meeti"
                    loadingLabel="Creando Meeti..."
                />
            </FieldSet>
        </Form>
    );
}