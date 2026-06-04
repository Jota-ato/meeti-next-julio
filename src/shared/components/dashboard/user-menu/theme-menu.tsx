import { useTheme } from "next-themes";
import {
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";


export function ThemeMenu() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                Tema
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 size-4" />
                    Claro
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 size-4" />
                    Oscuro
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 size-4" />
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}