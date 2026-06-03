
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_5kPDcQCL1mlF@ep-young-hat-aq2t7hmt-pooler.c-8.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require"!
    }
})