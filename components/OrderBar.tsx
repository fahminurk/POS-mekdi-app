"use client";
import React from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import { toIdr } from "~/lib/utils";
import { useOrderStore } from "~/store/orderStore";

const Orderbar = ({ children }: { children: React.ReactNode }) => {
  const { orders } = useOrderStore();
  const totalHarga = orders.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  return (
    <div className="flex h-screen">
      <div className="h-full flex-1 overflow-y-auto">{children}</div>
      <div className="hidden sm:flex flex-col gap-y-2 bg-red-600 h-full p-2 max-w-xs lg:max-w-sm w-full">
        <div className="flex justify-center md:justify-end">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            className="w-10 h-10"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-y-4 bg-white p-2 rounded-md overflow-auto">
          <p className="font-bold text-lg border-b">ORDER</p>
          {orders.length ? (
            orders.map((item: any) => {
              return (
                <div key={item.id} className="flex justify-between text-sm">
                  <p>{item.name}</p>
                  <div className="flex gap-1 ">
                    <p>{item.qty}</p>
                    <p>x</p>
                    <p>{toIdr(item.price)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">No orders</div>
          )}
          <div className="flex justify-between border-t">
            <p className="font-bold">TOTAL</p>
            <p className="font-bold">{toIdr(Number(totalHarga))}</p>
          </div>
        </div>
        <Button>Charge</Button>
      </div>
    </div>
  );
};

export default Orderbar;
