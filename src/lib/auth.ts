
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
        requireEmailVerification: true,
        sendResetPassword: async ({ user: { name, email }, url }) => { 
            await AuthEmailService.sendPasswordResetToken({name, email, url})
        }
    },
    emailVerification: {
        sendOnSignIn: true,
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user: { name, email }, url }) => { 
            await AuthEmailService.sendVerificationEmail({
                email,
                name,
                url
            })
        }
    },
    plugins: [nextCookies()]
})
