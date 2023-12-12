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
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";

import { useUpdateUserMutation } from "~/actions/useUser";
import { userSchema } from "~/lib/utils";

const EditModal: React.FC<{
  name: string;
  id: string;
  email: string;
  isSuperAdmin: boolean;
}> = ({ name, id, email, isSuperAdmin }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateUserMutation();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name,
      email,
      isSuperAdmin,
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      await mutateAsync({ id, ...values });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size={"sm"} variant={"outline"} onClick={() => setOpen(!open)}>
        Edit
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl font-bold">
            Edit User
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSuperAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Super Admin</FormLabel>
                    </div>
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
