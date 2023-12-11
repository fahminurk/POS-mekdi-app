import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type SidebarItemProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  burger?: boolean;
};
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
  burger = false,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-yellow-400 hover:bg-red-700 rounded-lg transition text-white p-2`,
        active && "text-yellow-300"
      )}
    >
      <Icon size={26} />
      <p className={`${!burger ? "hidden md:block" : ""} truncate w-full`}>
        {label}
      </p>
    </Link>
  );
};

export default SidebarItem;
