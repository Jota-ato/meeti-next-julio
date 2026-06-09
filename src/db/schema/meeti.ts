import { pgTable, uuid, varchar, text, boolean, time, date, integer, doublePrecision } from "drizzle-orm/pg-core";
import { community } from "./community"
import { users } from "./auth-schema"
import { relations } from "drizzle-orm";

export const meeti = pgTable('meetis', {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    details: text('details').notNull(),
    availableSeats: integer('available_seats').notNull(),
    date: date('date', { mode: 'string' }).notNull(),
    time: time('time').notNull(),
    image: varchar('image', { length: 100 }).notNull(),
    communityId: uuid('community_id').references(() => community.id, { onDelete: 'cascade' }).notNull(),
    categoryId: uuid('category_id').notNull(),
    createdBy: text('created_by').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    virtual: boolean('virtual').default(false).notNull()
})

export const meetiLocations = pgTable('meeti_locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    meetiId: uuid('meeti_id')
        .notNull()
        .references(() => meeti.id, { onDelete: 'cascade' }),
    placeName: varchar('place_name', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    country: varchar('country', { length: 100 }).notNull(),
    lat: doublePrecision("latitude").notNull(),
    lng: doublePrecision("longitude").notNull(),
});

export const meetiRelations = relations(meeti, ({ one }) => ({
    location: one(meetiLocations, {
        fields: [meeti.id],
        references: [meetiLocations.meetiId]
    })
}))

export const meetiLocationsRelations = relations(meetiLocations, ({ one }) => ({
    meeti: one(meeti, {
        fields: [meetiLocations.meetiId],
        references: [meeti.id]
    })
}))