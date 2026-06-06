import {
    community,
    communityMembers
} from "@/db/schema/community"
import {
    users,
    sessions,
    accounts,
    verifications,
    usersRelations,
    sessionsRelations,
    accountsRelations
} from "@/db/schema/auth-schema"
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(process.env.DATABASE_URL!, {
    schema: {
        community,
        communityMembers,
        users,
        sessions,
        accounts,
        verifications,
        usersRelations,
        sessionsRelations,
        accountsRelations,
    }
})