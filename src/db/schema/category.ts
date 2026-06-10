import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { meeti } from "./meeti";

export const category = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', { length: 50 }).notNull(),
    name: varchar('name', { length: 50 }).notNull(),
    image: varchar('image', {length: 100}).notNull()
})


export const categoryRelations = relations(category, ({ many }) => ({
    meetis: many(meeti)
}))