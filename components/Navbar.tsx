"use client";
import { IoFastFoodOutline, IoMenu } from "react-icons/io5";
import { useMemo, useState } from "react";
import Drawer from "react-modern-drawer";
import { HiHome, HiOutlineLogout } from "react-icons/hi";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import { MdOutlineTask } from "react-icons/md";
import "react-modern-drawer/dist/index.css";

import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Dashboard",
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: BiCategoryAlt,
        label: "Category",
        active: pathname === "/dashboard/category",
        href: "/dashboard/category",
      },
      {
        icon: IoFastFoodOutline,
        label: "Product",
        active: pathname === "/dashboard/product",
        href: "/dashboard/product",
      },
      {
        icon: MdOutlineTask,
        label: "Order",
        active: pathname === "/dashboard/order",
        href: "/dashboard/order",
      },
      {
        icon: BiUser,
        label: "User",
        active: pathname === "/dashboard/user",
        href: "/dashboard/user",
      },
    ],
    [pathname]
  );

  return (
    <div className="border-b-2">
      <div className="flex justify-between items-center sm:justify-end p-2 px-4">
        <div
          className="sm:hidden rounded-full p-1 hover:bg-yellow-200 cursor-pointer"
          onClick={toggleDrawer}
        >
          <IoMenu size={30} />
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          size={170}
        >
          <div className=" flex-col gap-y-2 bg-red-600 h-full p-2 ">
            <div>
              <div className="flex flex-col gap-y-4 p-2">
                {routes.map((item) => (
                  <SidebarItem key={item.label} {...item} burger={true} />
                ))}
              </div>
            </div>
            <div className="relative h-full p-2">
              <div
                className="abosulte bottom-0"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                <SidebarItem
                  icon={HiOutlineLogout}
                  label="logout"
                  href="/login"
                  burger={true}
                />
              </div>
            </div>
          </div>
        </Drawer>
        <div className="text-right">
          <p className="font-bold">{session?.user?.name}</p>
          <p className="text-xs">
            {session?.user.isSuperAdmin ? "Super Admin" : "Admin"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
