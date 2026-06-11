import { db } from "@/db";
import { users } from "@/db/schema/auth-schema";
import { User } from "@/features/auth/types/auth.types";
import { eq } from "drizzle-orm";
import { FullProfile } from "../types/profile.types";
import { format } from "date-fns";

export interface IProfileRepository {
    findById: (userId: string) => Promise<User>
    findFullProfileById: (userId: string) => Promise<FullProfile | undefined>
}

class ProfileRepository implements IProfileRepository {
    async findById(userId: string) {
        return (await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1)
        )[0]
    }

    async findFullProfileById(userId: string) {

        const today = format(new Date(), 'yyyy-MM-dd')

        return await db
            .query
            .users
            .findFirst({
                where: (user, { eq }) => eq(user.id, userId),
                with: {
                    communities: {
                        limit: 3
                    },
                    meeties: {
                        limit: 3,
                        where: (meeti, { gte }) => gte(meeti.date, today),
                        orderBy: (meeti, { asc }) => asc(meeti.date)
                    }
                }
            })
    }
}
export const profileRepository = new ProfileRepository()