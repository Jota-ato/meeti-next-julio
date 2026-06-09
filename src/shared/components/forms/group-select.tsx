"use client"

import {
    Select, SelectContent, SelectGroup, SelectItem,
    SelectLabel, SelectSeparator, SelectTrigger, SelectValue
} from "@/shared/components/ui/select";
import { Fragment } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

export type SelectOption = {
    value: string;
    label: string;
};

export type SelectGroup = {
    label: string;
    options: SelectOption[];
};

type GroupedSelectProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    placeholder?: string;
    groups: SelectGroup[];
    className?: string;
};

export function GroupedSelect<T extends FieldValues>({
    name,
    control,
    placeholder,
    groups,
    className = "w-full",
}: GroupedSelectProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="space-y-1">
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={className} ref={field.ref}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {groups.map((group, index) => (
                                <Fragment key={group.label}>
                                    <SelectGroup>
                                        <SelectLabel>{group.label}</SelectLabel>
                                        {group.options.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    {index < groups.length - 1 && <SelectSeparator />}
                                </Fragment>
                            ))}
                        </SelectContent>
                    </Select>

                    {fieldState.error && (
                        <p className="text-sm text-destructive">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
}