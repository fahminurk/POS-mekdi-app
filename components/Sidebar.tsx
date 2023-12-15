/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useMemo } from "react";
import { HiHome, HiOutlineLogout } from "react-icons/hi";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineTask } from "react-icons/md";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

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
    <div className="flex h-screen">
      <div className="hidden sm:flex flex-col gap-y-2 bg-red-600 h-full p-2 rounded-r-2xl">
        <div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              className="w-10 h-10"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col gap-y-4 p-2">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </div>
        <div className="relative h-full p-2">
          <div className="abosulte bottom-0" onClick={() => signOut()}>
            <SidebarItem icon={HiOutlineLogout} label="Logout" href="/auth" />
          </div>
        </div>
      </div>
      <div className="h-full flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Sidebar;
