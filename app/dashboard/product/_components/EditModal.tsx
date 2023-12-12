import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { useCategoryQuery } from "~/actions/useCategory";
import { UploadButton } from "~/lib/uploadthing";
import Image from "next/image";
import { useUpdateProductMutation } from "~/actions/useProduct";
import { toast } from "sonner";
import { productSchema } from "~/lib/utils";
import { editProductProps } from "~/types";

const EditModal: React.FC<editProductProps> = ({
  name,
  id,
  price,
  description,
  stock,
  categoryId,
  imgUrl,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>(imgUrl);
  const { mutateAsync, isPending } = useUpdateProductMutation();
  const { data } = useCategoryQuery();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name,
      price: String(price),
      categoryId,
      description,
      stock: String(stock),
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    try {
      if (!imgUrl) return toast.error("Please select an image");
      await mutateAsync({ id, ...values, imgUrl: selectedFile });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant={"outline"} onClick={() => setOpen(!open)}>
        Edit
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl font-bold">
            Edit Product
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                      <Input placeholder="price" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>stock</FormLabel>
                    <FormControl>
                      <Input placeholder="stock" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {data?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <UploadButton
                className=""
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setSelectedFile(res[0].url);
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {/* {imgUrl && (
                <Image src={imgUrl} alt="image" width={100} height={100} />
              )} */}
              <div className="flex justify-end">
                <Button type="submit" variant={"outline"} disabled={isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
