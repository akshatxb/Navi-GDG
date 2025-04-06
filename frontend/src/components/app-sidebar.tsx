"use client"

import {
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { authenticatedFetch } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const data = {
  user: {
    username: "Error",
    email: "Error",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: IconListDetails,
    },
    {
      title: "Live Status",
      url: "/dashboard/status",
      icon: IconFolder,
    },
    {
      title: "Recommendations",
      url: "/dashboard/recommendations",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(data.user)


  useEffect(() => {
    const handleUserData = async () => {
      setLoading(true)
      try {
        const response = await authenticatedFetch(router, "POST", process.env.NEXT_PUBLIC_AUTH_API_URL + "user")
        if (!response) {
          toast.error("Failed to fetch user data")
          setLoading(false)
          return
        }
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
        else {
          toast.error("Failed to fetch user data")
        }
      }
      catch (error) {
        console.error("Error fetching user data:", error)
        toast.error("Something went wrong")
      }
      finally {
        setLoading(false)
      }
    }
    handleUserData()
  }, [router])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">GDG</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {(loading && user) ? null : (<NavUser user={user} />)}
      </SidebarFooter>
    </Sidebar>
  )
}
