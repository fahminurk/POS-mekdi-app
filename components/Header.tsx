import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="p-3 border-b sticky top-0 bg-white w-full">
      <div className="flex justify-between items-center">
        <div className="font-bold text-3xl">Mekdi</div>
        <Button variant={"outline"} onClick={() => router.push("/dashboard")}>
          Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Header;
