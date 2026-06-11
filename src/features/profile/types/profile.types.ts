import { User } from "@/features/auth/types/auth.types";
import { SelectCommunity } from "@/features/communities/types/community.types";
import { SelectMeeti } from "@/features/meetis/types/meeti.types";

export type FullProfile = User & {
    communities: SelectCommunity[],
    meeties: SelectMeeti[]
}