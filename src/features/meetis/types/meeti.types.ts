import { category } from "@/db/schema/category";
import { meeti, meetiLocations, meetiAttendees } from "@/db/schema/meeti";
import { User } from "@/features/auth/types/auth.types";
import { SelectCommunity } from "@/features/communities/types/community.types";

export type SelectCategory = typeof category.$inferSelect


export type InsertBasicMeeti = typeof meeti.$inferInsert
export type InsertMeetiLocations = typeof meetiLocations.$inferInsert

export type SelectBasicMeeti = typeof meeti.$inferSelect
export type SelectMeetiLocations = typeof meetiLocations.$inferSelect

export type InsertMeeti = InsertBasicMeeti & {
    location?: Omit<InsertMeetiLocations, 'meetiId' | 'id'>
}

export type SelectMeeti = SelectBasicMeeti & {
    location?: SelectMeetiLocations | null
}

export type FullMeeti = SelectMeeti & {
    category: SelectCategory,
    community: SelectCommunity,
    admin: User
}

export type MeetiPermissions = {
    canConfirm: boolean,
    canCancel: boolean
}

export type SelectMeetiAttendee = typeof meetiAttendees.$inferSelect
export type SelectMeetiAttendeeWithUser = SelectMeetiAttendee & {
    user: User,
    meeti: SelectMeeti
}