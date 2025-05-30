import { Outlet } from "react-router";
import { useUser } from "@clerk/clerk-react";
import SideBar, {
  driverMenuItems,
  policeMenuItems,
  adminMenuItems,
} from "@/components/SideBar";

function DashboardLayout() {
  const { user } = useUser();

  const role = user?.publicMetadata?.role;

  let menuItems = [];

  switch (role) {
    case "driver":
      menuItems = driverMenuItems;
      break;
    case "police":
      menuItems = policeMenuItems;
      break;
    case "admin":
      menuItems = adminMenuItems;
      break;
    default:
      menuItems = [];
  }

  return (
    <div className="flex h-screen flex-1">
      <SideBar menuItems={menuItems} user={{ initials: user?.firstName?.[0] + user?.lastName?.[0] || "" }} />
    </div>
  );
}

export default DashboardLayout;
