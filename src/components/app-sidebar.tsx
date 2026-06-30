import * as React from "react"
import {
    Origami,
    LockKeyhole,
    KeyRound,
    Settings
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./navmenu-sidebar"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Passwords",
            url: "#",
            icon: LockKeyhole,
            isActive: true,
        },
        {
            title: "Password Generator",
            url: "#",
            icon: KeyRound,
            isActive: false,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
            isActive: false,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <a href="#" className="flex items-center mt-2 ml-1">

                    {/* BIG ICON */}
                    <div className="flex mr-3 mt-1 aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary/10 shadow-sm">
                        <Origami className="size-5 text-sidebar-primary" />
                    </div>

                    {/* TEXT (LEFT ALIGNED) */}
                    <div className="flex flex-col items-start text-left leading-tight mt-1">

                        <span className="font-semibold tracking-tight text-sidebar-foreground drop-shadow-md">
                            Kyooowe Hub
                        </span>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground drop-shadow-sm">
                                Family Hub Application
                            </span>

                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sidebar-primary/10 text-sidebar-primary shadow-sm">
                                v1.0.0
                            </span>
                        </div>

                    </div>

                </a>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
