import { community } from "@/db/schema/community"
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle("postgresql://neondb_owner:npg_5kPDcQCL1mlF@ep-young-hat-aq2t7hmt-pooler.c-8.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require", {
    schema: {
        community
    }
}) 