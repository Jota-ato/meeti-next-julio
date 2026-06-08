"use client"

import { GroupedSelect, SelectGroup } from "@/shared/components/forms/group-select";
import { Suspense, use } from "react";



const communitiesPromise = fetch('/api/user/communities').then(res => res.json())

export function CommunityFormSelect({
    control
}: {
    control: any
}) {

    const communitites = use<{ id: string, name: string }[]>(communitiesPromise)

    const MOCK_GROUPS: SelectGroup[] = [
        {
            label: "Comunidades que creaste",
            options: communitites.map(community => ({value: community.id, label: community.name})),
        },
    ];

    return (
        <Suspense fallback="Cargando...">
            <GroupedSelect
                control={control}
                name="community"
                placeholder="Comunidad del meeti"
                groups={MOCK_GROUPS}
            />
        </Suspense>
    );
}