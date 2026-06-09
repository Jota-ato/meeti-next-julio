import { FieldWLabel } from "@/shared/components/forms/field-w-label";
import { Form } from "@/shared/components/forms/Form";
import { Button } from "@/shared/components/ui/button";
import { FieldSet } from "@/shared/components/ui/field";
import { useCommunityStore } from "../stores/community.store";
import { useForm } from "react-hook-form";
import { CheckPasswordSchema, CheckPasswordType } from "@/features/auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { deleteCommunityAction } from "../actions/community-actions";
import { toast } from "sonner";
import { SubmitButton } from "@/shared/components/forms/submit-button";

export default function DeleteCommunityForm() {

    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<CheckPasswordType>({
        resolver: zodResolver(CheckPasswordSchema)
    })

    const { toggleOpen, setCommunity, community } = useCommunityStore()

    const onSubmit = async (data: CheckPasswordType) => {
        if (!community) return
        const { success, message } = await deleteCommunityAction(data, community.id)

        if (!success) toast.error(message)
        else {
            toast.success(message)
            reset()
            toggleOpen()
            setCommunity(null)
            setTimeout(() => {
                redirect('/dashboard/communities')
            }, 1000)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <FieldSet>
                <FieldWLabel
                    label="Confirma con tu Password"
                    id="password"
                    type="password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <div className="flex flex-col sm:flex-row gap-2">
                    <SubmitButton
                        destructive
                        isSubmitting={isSubmitting}
                        label="Eliminar comunidad"
                        loadingLabel="Eliminando..."
                    />

                    <Button
                        type="button"
                        data-autofocus
                        onClick={() => {
                            toggleOpen()
                            setCommunity(null)
                        }}
                    >
                        Cancelar
                    </Button>
                </div>
            </FieldSet>
        </Form>
    )
}