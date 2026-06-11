import { drizzle } from "drizzle-orm/node-postgres";
import { category } from "@/db/schema/category";
import { community, communityMembers } from "@/db/schema/community";
import { users } from "@/db/schema/auth-schema";
import { meeti, meetiLocations } from "@/db/schema/meeti";
import { categories } from "./data/categories";
import { communities } from "./data/communities";
import { meetis } from "./data/meetis";
import { seedUser } from "./data/user";
import { SEED_USER_ID } from "./constants";
import "dotenv/config";

async function seed() {
    const db = drizzle(process.env.DATABASE_URL!);

    console.log("Seeding categories...");
    await db
        .insert(category)
        .values(categories)
        .onConflictDoNothing();

    console.log("Seeding user...");
    await db
        .insert(users)
        .values(seedUser)
        .onConflictDoNothing();

    console.log("Seeding communities...");
    await db
        .insert(community)
        .values(communities)
        .onConflictDoNothing();

    console.log("Seeding community members...");
    await db
        .insert(communityMembers)
        .values(
            communities.map(({ id }) => ({
                communityId: id,
                userId: SEED_USER_ID,
            }))
        )
        .onConflictDoNothing();

    console.log("Seeding meetis...");
    for (const { location, ...meetiData } of meetis) {
        await db
            .insert(meeti)
            .values(meetiData)
            .onConflictDoNothing();

        if (!meetiData.virtual && location) {
            await db
                .insert(meetiLocations)
                .values({
                    ...location,
                    meetiId: meetiData.id,
                })
                .onConflictDoNothing();
        }
    }

    console.log("Seed completed.");
}

seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    });
