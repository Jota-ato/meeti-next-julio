import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/shared/components/ui/card";
import { CommunitieForm } from "./communitie-form";

export function CreateCommunitie() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Crea tu comunidad
                </CardTitle>
                <CardDescription className="sr-only">
                    Formulario para crear comunidad
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CommunitieForm />
            </CardContent>
        </Card>
    )
}