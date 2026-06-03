import { auth } from "@/lib/auth";

export type User = typeof auth.$Infer.Session.user

export type ActionResponse = Promise<{
    success: boolean,
    message: string
}>