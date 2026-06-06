import {
    community,
    communityMembers,
    communityRelations,      
    communityMembersRelations
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
        // Tablas
        community,
        communityMembers,
        users,
        sessions,
        accounts,
        verifications,

        communityRelations,       
        communityMembersRelations, 
        usersRelations,
        sessionsRelations,
        accountsRelations,
    }
})