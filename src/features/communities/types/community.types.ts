import { community } from "@/db/schema/community";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type InsertCommunity = InferInsertModel<typeof community>
export type SelectCommunity = InferSelectModel<typeof community>