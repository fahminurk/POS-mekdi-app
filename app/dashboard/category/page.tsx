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
import { Input } from "~/components/ui/input";
import { useCategoryQuery } from "~/actions/useCategory";
import CreateModal from "./_components/CreateModal";
import EditModal from "./_components/EditModal";
import DeleteModal from "./_components/DeleteModal";

const Page = () => {
  const { data } = useCategoryQuery();

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold">CATEGORY</div>
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
            <TableHead>Name</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user, i) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <EditModal name={user.name} id={user.id} />
                <DeleteModal id={user.id} name={user.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
