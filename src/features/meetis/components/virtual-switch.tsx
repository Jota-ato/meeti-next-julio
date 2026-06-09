import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Switch } from "@/shared/components/ui/switch";
import { Controller, Control } from "react-hook-form"
import { MeetiType } from "../schemas/meeti-schema";


export function VirtualSwitch({ 
    control
}: { 
    control: Control<MeetiType>
}) {
    return (

        <Controller
            control={control}
            name="virtual"
            render={({ field, formState: { errors }}) => (
                <Field orientation="horizontal" className="py-4 max-w-sm">
                    <FieldContent>
                        <FieldLabel htmlFor="virtual">¿Es virtual?</FieldLabel>
                        <FieldDescription>
                            Vía zoom, google meet, teams, etc.
                        </FieldDescription>
                    </FieldContent>
                    <Switch
                        id="virtual"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    {errors.virtual && (
                        <FieldError>{errors.virtual.message}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}