"use client"

import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { Form } from "@/shared/components/forms/Form";
import { FieldError, FieldSet } from "@/shared/components/ui/field";
import { CommunityFormSelect } from "./community-form-select";
import { useForm } from "react-hook-form";
import { CommunitiesForMeetiType } from "@/features/communities/types/community.types";
import { SelectCategory, SelectMeeti } from "../types/meeti.types";
import { CategoryFormSelect } from "./category-form-select";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeetiSchema, MeetiType } from "../schemas/meeti-schema"
import { SubmitButton } from "@/shared/components/forms/submit-button";
import { VirtualSwitch } from "./virtual-switch";
import ImageUploader from "@/shared/components/upload/image-uploader";
// Importamos la acción de actualizar junto con la de crear
import { createMeetiAction, updateMeetiAction } from "../actions/meeti-actions"; 
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
    categories,
    meeti
}: {
    communities: CommunitiesForMeetiType[][]
    categories: SelectCategory[]
    meeti?: SelectMeeti
}) {
    // Detectamos si estamos editando basándonos en la existencia del prop `meeti`
    const isEditing = !!meeti;

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
        // Inicializamos el formulario dinámicamente con los datos existentes o vacíos
        defaultValues: {
            title: meeti?.title ?? '',
            details: meeti?.details ?? '',
            categoryId: meeti?.categoryId ?? '',
            communityId: meeti?.communityId ?? '',
            availableSeats: meeti?.availableSeats ?? 0,
            date: meeti?.date ?? '',
            time: meeti?.time ?? '',
            image: meeti?.image ?? '',
            virtual: meeti?.virtual ?? false,
            location: {
                placeName: meeti?.location?.placeName ?? '',
                address: meeti?.location?.address ?? '',
                city: meeti?.location?.city ?? '',
                country: meeti?.location?.country ?? '',
                lat: meeti?.location?.lat ?? 19.4355654,
                lng: meeti?.location?.lng ?? -99.153843
            }
        }
    })

    // eslint-disable-next-line react-hooks/incompatible-library
    const isVirtual = watch('virtual')
    const currentImage = watch('image')

    const onSubmit = async (data: MeetiType) => {
        console.log(data);
        const response = isEditing 
            ? await updateMeetiAction(meeti.id, { ...data })
            : await createMeetiAction({ ...data })

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
                    // Pasamos el valor actual de la imagen (vacío o cargado desde la edición)
                    image={currentImage} 
                />

                {errors.image && (
                    <FieldError>
                        {errors.image.message}
                    </FieldError>
                )}

                <SubmitButton
                    isSubmitting={isSubmitting}
                    // Adaptamos dinámicamente las etiquetas del botón
                    label={isEditing ? "Guardar Cambios" : "Crear Meeti"}
                    loadingLabel={isEditing ? "Guardando Cambios..." : "Creando Meeti..."}
                />
            </FieldSet>
        </Form>
    );
}