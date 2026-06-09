"use client"

import { CommunitiesForMeetiType } from "@/features/communities/types/community.types";
import { GroupedSelect, SelectGroup } from "@/shared/components/forms/group-select";
import { MeetiType } from "../schemas/meeti-schema";
import { Control } from "react-hook-form";

export function CommunityFormSelect({
    control,
    communities
}: {
    control: Control<MeetiType>,
    communities: CommunitiesForMeetiType[][]
}) {


    const MOCK_GROUPS: SelectGroup[] = [
        {
            label: "Comunidades que creaste",
            options: communities[0].map(community => ({ value: community.id, label: community.name })),
        },
        {
            label: "Comunidades a las que te uniste",
            options: communities[1].map(community => ({ value: community.id, label: community.name })),
        },
    ];

    return (
        <GroupedSelect
            control={control}
            name="communityId"
            placeholder="Comunidad del meeti"
            groups={MOCK_GROUPS}
        />
    );
}