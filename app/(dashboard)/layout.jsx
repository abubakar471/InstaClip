import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/DashboardPage/AppSidebar/AppSidebar"

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="bg-[#f6f6f6] w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
