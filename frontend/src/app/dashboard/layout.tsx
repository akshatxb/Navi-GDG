import { AppSidebar } from "@/components/app-sidebar"
import ChatBot from "@/components/ChatBot"
import Protected from "@/components/Protected"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Protected>
                <ChatBot />
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "calc(var(--spacing) * 72)",
                            "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <SiteHeader />
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </Protected>
        </>
    )
}

export default DashboardLayout
