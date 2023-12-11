import React, { ChangeEventHandler, useState } from "react";
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
import { Input } from "~/components/ui/input";
import { useUpdateCategoryMutation } from "~/actions/useCategory";

const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const EditModal: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateCategoryMutation();

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name,
    },
  });

  async function onSubmit(values: z.infer<typeof createCategorySchema>) {
    try {
      await mutateAsync({ id, ...values });
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
            Edit Category
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
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
