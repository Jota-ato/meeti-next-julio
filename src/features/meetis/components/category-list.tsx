import { Container } from "@/shared/components/ui/container";
import { categoryService } from "../sevices/category-service";
import { Heading } from "@/shared/components/typography/heading";
import { CategoryCard } from "./category-card";

export async function CategroyList() {

    const categories = await categoryService.getAllCategories()

    return (
        <Container className="py-10 space-y-5 px-5 lg:px-0">
            <Heading level={2}>Categorías</Heading>

            <ul className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 p-5 md:p-0">
                {categories.map(category => (<CategoryCard key={category.id} category={category} />))}
            </ul>
        </Container>
    )
}