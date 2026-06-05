import { User } from "@/features/auth/types/auth.types";
import { SelectCommunity } from "../types/community.types";

export class MembershipPolicy {
    static canJoin(user: User, community: SelectCommunity, isMember: boolean) {
        if (isMember) return false

        // El admin no se puede unir
        if (community.createdBy === user.id) return false

        return true
    }
    static canLeave(user: User, community: SelectCommunity, isMember: boolean) {
        if (community.createdBy === user.id) return false

        return isMember
    }
}