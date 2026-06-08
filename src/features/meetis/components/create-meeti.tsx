"use client"

import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { Form } from "@/shared/components/forms/Form";
import { FieldSet } from "@/shared/components/ui/field";
import { CommunityFormSelect } from "./community-form-select";
import { useForm } from "react-hook-form";

type FieldConfig = {
    id: string;
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

const locationFields: FieldConfig[] = [
    { id: "place_name", label: "Nombre Lugar:", type: "text", placeholder: "Nombre Lugar evento" },
];

export function CreateMeeti() {

    const {
        control
     } = useForm()

    return (
        <Form>
            <FieldSet>
                {mainFields.map((field) => (
                    <FieldWLabel
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        type={field.type}
                    />
                ))}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {dateTimeFields.map((field) => (
                        <FieldWLabel key={field.id} {...field} />
                    ))}
                </div>

                <CommunityFormSelect control={control} />

                <FieldWLabel
                    id="virtual"
                    label="¿Evento Virtual?"
                    type="checkbox"
                />
            </FieldSet>

            <FieldSet className="space-y-3">
                <p className="font-black text-4xl mb-5">Ubicación Meeti</p>

                {locationFields.map((field) => (
                    <FieldWLabel key={field.id} {...field} />
                ))}
            </FieldSet>

        </Form>
    );
}