import { pgTable, text, timestamp, uuid, varchar, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./auth-schema";
import { relations } from "drizzle-orm";

/**
 * Tabla principal de Comunidades.
 */
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

/**
 * Tabla pivote (Junction Table) para la relación N:M entre Usuarios y Comunidades.
 */
export const communityMembers = pgTable('community_members', {
    communityId: uuid('community_id')
        .references(() => community.id, { onDelete: 'cascade' })
        .notNull(),
    userId: text('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    joinedAt: timestamp('joined_at').defaultNow(),
}, (t) => ({
    // [FIX 2]: Llave Primaria Compuesta. Garantiza que un usuario solo tenga 1 membresía por comunidad.
    pk: primaryKey({ columns: [t.communityId, t.userId] })
}))

// --- CONFIGURACIÓN DE LA API RELACIONAL DE DRIZZLE ---

export const communityRelations = relations(community, ({ one, many }) => ({
    // Opcional pero recomendado: permite traer los datos del creador al consultar la comunidad
    creator: one(users, {
        fields: [community.createdBy],
        references: [users.id]
    }),
    // [FIX 3]: Corregido el target de 'many' (antes apuntaba a 'community')
    communityMembers: many(communityMembers)
}))

export const communityMembersRelations = relations(communityMembers, ({ one }) => ({
    // [FIX 4]: Especificados los 'fields' y 'references' para que Drizzle sepa cómo hacer el JOIN
    community: one(community, {
        fields: [communityMembers.communityId],
        references: [community.id]
    }),
    // [FIX 5]: Especificados los 'fields' y 'references' para el usuario
    user: one(users, {
        fields: [communityMembers.userId],
        references: [users.id]
    })
}))