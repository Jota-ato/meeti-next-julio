import { cn } from "@/lib/utils";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/shared/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem
} from "@/shared/components/ui/sidebar";
import { ChevronDown, Sun, Moon, Monitor, Palette } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggleSideBar({
    isCollapsed
}: {
    isCollapsed: boolean
}) {

    const { theme, setTheme } = useTheme()

    const themes = [
        { value: 'light', label: 'Claro', icon: Sun },
        { value: 'dark', label: 'Oscuro', icon: Moon },
        { value: 'system', label: 'Sistema', icon: Monitor },
    ]

    return (
        <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex items-center gap-2">
                        <Palette className="size-4 md:size-5 shrink-0" />
                        {!isCollapsed && (<>
                            Tema
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </>)}
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
            </SidebarGroup>
            <CollapsibleContent>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {themes.map(({ value, label, icon: Icon }) => (
                            <SidebarMenuItem
                                key={value}
                                onClick={() => setTheme(value)}
                                className={cn(
                                    "flex items-center gap-2 text-muted-foreground text-xs sm:text-sm px-4 py-2 hover:bg-secondary hover:text-accent-foreground rounded-xl transition-all duration-100 cursor-pointer",
                                    theme === value ? 'text-accent-foreground' : ''
                                )}
                            >
                                <Icon className={cn("size-4 md:size-5 shrink-0", theme === value ? 'text-accent-foreground' : 'text-muted-foreground')} />
                                {!isCollapsed ? label: ''}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </CollapsibleContent>
        </Collapsible>
    )
}