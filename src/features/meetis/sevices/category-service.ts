import { notFound } from "next/navigation";
import { SelectCategory } from "../types/meeti.types";
import { categoryRepository, ICategoryRepository } from "./category-repository";

class CategoryService {
    constructor(
        private categoryRepository: ICategoryRepository
    ) { }

    async getAllCategories() {
        return await this.categoryRepository.findAll()
    }

    async getCategoryById(categoryId: SelectCategory['id']) {
        const category = await this.categoryRepository.findById(categoryId)
        if (!category) notFound()
        return category
    }
}

export const categoryService = new CategoryService(categoryRepository)