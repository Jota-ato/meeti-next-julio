import { pgTable, text, timestamp, uuid, varchar, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
import { relations } from "drizzle-orm";
import { meeti } from "./meeti";

export const community = pgTable('communities', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: text('created_by')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    image: varchar('image', { length: 120 }).notNull()
})

export const communityMembers = pgTable('community_members', {
    communityId: uuid('community_id')
        .references(() => community.id, { onDelete: 'cascade' })
        .notNull(),
    userId: text('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    joinedAt: timestamp('joined_at').defaultNow(),
}, (t) => ({
    pk: primaryKey({ columns: [t.communityId, t.userId] })
}))


export const communityRelations = relations(community, ({ one, many }) => ({
    creator: one(users, {
        fields: [community.createdBy],
        references: [users.id]
    }),
    communityMembers: many(communityMembers),
    meeti: many(meeti)
}))

export const communityMembersRelations = relations(communityMembers, ({ one }) => ({
    community: one(community, {
        fields: [communityMembers.communityId],
        references: [community.id]
    }),
    user: one(users, {
        fields: [communityMembers.userId],
        references: [users.id]
    })
}))