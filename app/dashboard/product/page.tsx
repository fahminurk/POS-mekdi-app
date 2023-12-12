"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import CreateModal from "./_components/CreateModal";
import { useProductQuery } from "~/actions/useProduct";
import Image from "next/image";
import EditModal from "./_components/EditModal";
import DeleteModal from "./_components/DeleteModal";
import { toIdr } from "~/lib/utils";

const Page = () => {
  const { data } = useProductQuery();

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold">PRODUCT</div>
        <CreateModal />
      </div>
      <div className="flex gap-2">
        <Input type="text" placeholder="Search" className="max-w-xs w-full" />
        <Select>
          <SelectTrigger className="max-w-[180px] w-full">
            <SelectValue placeholder="order by" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="ASC">ASC</SelectItem>
            <SelectItem value="DESC">DESC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table className="border-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>
                <Image src={item.imgUrl} alt="img" width={100} height={100} />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{toIdr(item.price)}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell className="flex flex-col gap-2 justify-center ">
                <EditModal
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  stock={item.stock}
                  description={item.description}
                  imgUrl={item.imgUrl}
                  categoryId={item.category.id}
                />
                <DeleteModal id={item.id} name={item.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
