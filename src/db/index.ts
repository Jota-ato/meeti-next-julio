import {
    community,
    communityMembers,
    communityRelations,      
    communityMembersRelations
} from "@/db/schema/community"
import { 
    notifications
} from "@/db/schema/notifications"
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
import { category } from "./schema/category";
import { meeti, meetiLocations } from "./schema/meeti";

export const db = drizzle(process.env.DATABASE_URL!, {
    schema: {
        community,
        communityMembers,
        users,
        sessions,
        accounts,
        verifications,
        notifications,
        category,
        meeti,
        meetiLocations,
        communityRelations,       
        communityMembersRelations, 
        usersRelations,
        sessionsRelations,
        accountsRelations,
    }
})
