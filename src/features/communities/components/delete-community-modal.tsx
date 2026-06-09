"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useCommunityStore } from "../stores/community.store"
import DeleteCommunityForm from "./delete-community-form"

export default function DeleteCommunityModal() {
    const { open, toggleOpen, setCommunity } = useCommunityStore()

    function handleOpenChange(isOpen: boolean) {
        if (!isOpen) {
            toggleOpen()
            setCommunity(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <div className="flex items-start gap-4">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                            <ExclamationTriangleIcon aria-hidden="true" className="size-6" />
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <DialogTitle>
                                Eliminar Comunidad
                            </DialogTitle>
                            <div className="mt-2">
                                <p className="text-sm">
                                    ¿Confirmas que deseas eliminar la Comunidad? Una comunidad eliminada no se puede recuperar.
                                </p>
                                <DeleteCommunityForm />
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}