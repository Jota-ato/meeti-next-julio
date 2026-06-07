import { community, communityMembers } from "@/db/schema/community";
import { User } from "@/features/auth/types/auth.types";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type InsertCommunity = InferInsertModel<typeof community>
export type SelectCommunity = InferSelectModel<typeof community>
export type CommunityPermissions = {
    canEdit: boolean
    canDelete: boolean
    canJoin: boolean
    canLeave: boolean
    canViewMembers: boolean
}

export type CommunityContext = {
    isAdmin: boolean
    isMember: boolean
}

export type CommunityWithPermissions = {
    data: SelectCommunity
    memberCount: number
    context: CommunityContext
    permissions: CommunityPermissions
}

export type SelectComunityMembers = typeof communityMembers.$inferSelect
export type JoinedCommunity = SelectComunityMembers & {
    community: SelectCommunity,
    user: User
}