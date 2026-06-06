import { db } from "@/db";
import { users } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";
import { User } from "../types/auth.types";

/**
 * Interface defining the contract for User and Authentication data access.
 * Separates the database querying logic from the authentication business rules.
 */
export interface IAuthRepository {
    userExists(email: string): Promise<User | undefined>
}

/**
 * Concrete implementation of the Auth Repository.
 * @implements {IAuthRepository}
 */
class AuthRepository implements IAuthRepository {
    /**
     * Checks for the existence of a user by their email address.
     * Utilizes Drizzle's Relational API (`db.query`) for ergonomic data fetching.
     * * @param {string} email - The email address to query.
     * @returns {Promise<User | undefined>} The user object if found, otherwise undefined.
     */
    async userExists(email: string): Promise<User | undefined> {
        return await db
            .query
            .users
            .findFirst({
                where: eq(users.email, email)
            })
    }
}

export const authRepository = new AuthRepository()