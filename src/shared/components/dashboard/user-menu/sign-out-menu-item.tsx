"use client"
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";

export function SignOutMenuItem() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Sesión cerrada correctamente");
                    router.push("/auth/sign-in");
                },
                onError: () => {
                    toast.error("Ocurrió un error, intenta nuevamente");
                },
            },
        });
    };

    return (
        <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={handleSignOut}
        >
            Cerrar sesión
        </DropdownMenuItem>
    );
}