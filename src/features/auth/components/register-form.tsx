import { Form } from "@/shared/components/forms/Form";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

export function SignUpForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Crea tu cuenta
                </CardTitle>
            </CardHeader>
            <Form>
                <CardContent>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">
                                Nombre
                            </FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Ingresa tu nombre"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">
                                E-mail
                            </FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Ingresa tu Email"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">
                                Contraseña
                            </FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Contraseña - Min. 8 caracteres"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password_confirmation">
                                Contraseña
                            </FieldLabel>
                            <Input
                                id="password_confirmation"
                                type="password"
                                placeholder="Repite tu contraseña"
                            />
                        </Field>
                    </FieldGroup>
                </CardContent>
                <CardFooter className="mt-8">
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Crear cuenta
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    )
}