"use client"

import { GroupedSelect, SelectGroup } from "@/shared/components/forms/group-select";
import { SelectCategory } from "../types/meeti.types";
import { Control } from "react-hook-form";
import { MeetiType } from "../schemas/meeti-schema";

export function CategoryFormSelect({
    control,
    categories
}: {
    control: Control<MeetiType>,
    categories: SelectCategory[]
}) {


    const MOCK_GROUPS: SelectGroup[] = [
        {
            label: "Categorias",
            options: categories.map(community => ({ value: community.id, label: community.name })),
        },
    ];

    return (
        <GroupedSelect
            control={control}
            name="categoryId"
            placeholder="Categoría del meeti"
            groups={MOCK_GROUPS}
        />
    );
}