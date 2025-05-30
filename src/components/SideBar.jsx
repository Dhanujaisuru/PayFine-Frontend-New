import { CreditCard, FileText, Home, LogOut, User, Gavel, Users, Shield } from "lucide-react";
import { Link, useNavigate, Outlet } from "react-router";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { UserButton } from "@clerk/clerk-react";


export const driverMenuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard/driver" },
  { name: "Fines", icon: CreditCard, path: "/dashboard/driver/fine" },
  { name: "Appeals", icon: Gavel, path: "/dashboard/driver/appeal" },
  { name: "Profile", icon: User, path: "/dashboard/driver/profile" },
];

export const policeMenuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard/police" },
  { name: "Fines", icon: CreditCard, path: "/dashboard/police/issue-fine" },
  { name: "Profile", icon: User, path: "/dashboard/police/profile" },
];

export const adminMenuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard/admin" },
  { name: "Users", icon: User, path: "/dashboard/admin/users" },
  { name: "Fines", icon: CreditCard, path: "/dashboard/admin/fines" },
  { name: "Appeals", icon: Gavel, path: "/dashboard/admin/appeals" },
  { name: "Drivers", icon: Users, path: "/dashboard/admin/drivers" },
  { name: "Police Officers", icon: Shield, path: "/dashboard/admin/police" },
  { name: "Reports & Statistics", icon: FileText, path: "/dashboard/admin/reports" },
];

export function SideBar({ menuItems, user = { initials: "" }, children }) {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);


  const handleLogout = () => {
    navigate("/sign-in");
  };

  const handleNavigation = (path) => {
    setCurrentPath(path);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-muted/40">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center justify-center py-4">
            <div className="flex items-center gap-2">
              <Link to="/">
                <h1 className="text-3xl font-bold cursor-pointer">PayFine.LK</h1>
              </Link>
            </div>
          </SidebarHeader>
          <Separator />
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === item.path}
                    tooltip={item.name}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className="flex items-center gap-4"
                    >
                      <item.icon className="h-10 w-10 text-muted-foreground" />
                      <span className="text-base">{item.name}</span>
                    </Link>

                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarContent>

          {/* <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className={"flex items-center gap-4"}
                >
                  <LogOut className="h-10 w-10" />
                  <span className="text-base">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter> */}
        </Sidebar>

        <div className="flex flex-1 flex-col w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 py-8">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </header>

          <main className="flex-1 w-full p-6">
            {children}
            <Outlet />
          </main>

        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default SideBar;