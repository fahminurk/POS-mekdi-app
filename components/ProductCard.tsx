import { Product } from "@prisma/client";
import Image from "next/image";
import { toIdr } from "~/lib/utils";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "./ui/input";
import { useOrderStore } from "~/store/orderStore";

export type ProductCardProps = {
  props: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ props }) => {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState<number>(0);
  const addOrder = useOrderStore((state) => state.addOrder);

  const handleInputOrder = () => {
    addOrder(props, qty);
    setOpen(!open);
    // const previousOrder = localStorage.getItem("order");
    // let orders = [];
    // if (previousOrder) {
    //   orders = JSON.parse(previousOrder);
    // }
    // const newOrder = { ...props, qty };
    // orders.push(newOrder);
    // localStorage.setItem("order", JSON.stringify(orders));
    // setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        onClick={() => setOpen(!open)}
        className="p-2 flex flex-col rounded-lg border gap-1 cursor-pointer hover:bg-gray-100"
      >
        <Image
          src={props.imgUrl}
          alt={props.name}
          width={200}
          height={200}
          className="w-full object-cover h-48"
        />
        <div className="border-b font-bold truncate">{props.name}</div>
        <div className="text-sm border-b">{props.description}</div>
        <div className="text-sm">{toIdr(props.price)}</div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QTY</DialogTitle>
          <Input
            type="number"
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleInputOrder}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;
