"use client"

import { Form } from "@/shared/components/forms/Form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

export function SignInForm() {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>
                    Entra a tu cuenta
                </CardTitle>
                <CardDescription className="sr-only">
                    Sign-in
                </CardDescription>
            </CardHeader>
            <Form>
                <CardContent>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    E-mail
                                </FieldLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Ingresa tu E-mail"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Ingresa tu contraseña
                                </FieldLabel>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Ingresa tu contraseña"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </CardContent>
                <CardFooter className="mt-6">
                    <Button type="submit" className="w-full">
                        Iniciar sesión
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    )
}