import { category } from "@/db/schema/category";
import { meeti, meetiLocations } from "@/db/schema/meeti";

export type SelectCategory = typeof category.$inferSelect


export type InsertBasicMeeti = typeof meeti.$inferInsert
export type InsertMeetiLocations = typeof meetiLocations.$inferInsert

export type SelectBasicMeeti = typeof meeti.$inferSelect
export type SelectMeetiLocations = typeof meetiLocations.$inferSelect

export type InsertMeeti = InsertBasicMeeti & {
    location?: Omit<InsertMeetiLocations, 'meetiId' | 'id'>
}

export type SelectMeeti = SelectBasicMeeti & {
    location?: SelectMeetiLocations
}