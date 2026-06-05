import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card";
import { CommunitieForm } from "./communitie-form";
import { SelectCommunity } from "../types/community.types";

export function CommunityFormCard({
    community
}: {
    community?: SelectCommunity
}) {

    const isEditing = typeof community !== 'undefined'

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {isEditing ? `Editando ${community.name}` : 'Crea tu comunidad'}
                </CardTitle>
                <CardDescription className="sr-only">
                    {isEditing ? 'Formulario para editar comunidad' : 'Formulario para crear comunidad'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CommunitieForm
                    community={community}
                />
            </CardContent>
        </Card>
    )
}