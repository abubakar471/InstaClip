
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/DashboardPage/AppSidebar/AppSidebar"
import DashboardLayoutContainer from "@/components/DashboardPage/DashboardLayoutContainer/DashboardLayoutContainer"

export default function DashboardLayout({ children }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            {/*  px-10 pt-4 */}
            <main className="w-full px-4 lg:px-10 pt-4">
                <DashboardLayoutContainer children={children} />
            </main>
        </SidebarProvider>
    )
}
