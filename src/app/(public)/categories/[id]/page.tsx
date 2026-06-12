import { CategoryMeetis } from "@/features/meetis/components/category-meetis";
import { categoryService } from "@/features/meetis/sevices/category-service";
import { Heading } from "@/shared/components/typography/heading";
import { Container } from "@/shared/components/ui/container";
import { Metadata } from "next";
import { cache } from "react";

const getCategoryCached = cache(async (id: string) => await categoryService.getCategoryById(id))

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params

    const category = await getCategoryCached(id)

    return {
        title: `Categoría ${category.name}`
    }
}

export default async function CategoryPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params

    const category = await getCategoryCached(id)

    return (
        <Container className="px-5 lg:px-0 py-10">
            <main>
                <Heading>Meetis en la categoría: {category.name}</Heading>
                <CategoryMeetis
                    categoryId={category.id}
                />
            </main>
        </Container>
    )
}
