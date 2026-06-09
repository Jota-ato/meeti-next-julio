import { db } from "@/db";
import { SelectCategory } from "../types/meeti.types";
import { category } from "@/db/schema/category";
import { eq } from "drizzle-orm";

export interface ICategoryRepository { 
    findAll: () => Promise<SelectCategory[]>
    findById: (categoryId: SelectCategory['id']) => Promise<SelectCategory>
}

class CategoryRepository implements ICategoryRepository{ 
    async findAll() { 
        return await db
            .select()
            .from(category)
    }

    async findById(categoryId: SelectCategory['id']) { 
        return (await db
            .select()
            .from(category)
            .where(eq(category.id, categoryId))
            .limit(1)
        )[0]
    }
}

export const categoryRepository = new CategoryRepository()