
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js"
import { db } from "../db"
import { AuthEmailService } from "@/emails/services/auth-email-service";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        usePlural: true
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignIn: true,
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => { 
            await AuthEmailService.sendVerificationEmail({
                email: user.email,
                name: user.name,
                url
            })
        }
    },
    plugins: [nextCookies()]
})
