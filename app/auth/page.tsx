/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { loginSchema } from "~/lib/utils";

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      //
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (res?.status == 200) {
        toast.success("Login successful");
        router.push("/dashboard");
      } else if (res?.status == 401) {
        toast.error(res?.error);
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || err.message);
    }
  }

  return (
    <div className="flex bg-yellow-300">
      <div className="flex flex-1 justify-center items-center flex-col p-5 h-screen">
        <div className=" max-w-xl w-full bg-white">
          <div className="p-2 text-center font-bold text-2xl border-b">
            LOGIN
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8  p-4 "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-red-500 hover:opacity-75 text-white"
                // disabled={isPending}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <img
        src={"./images/mcd.png"}
        alt="mcd"
        className="hidden md:block rounded-l-xl h-screen md:w-1/2 lg:w-2/3 object-cover bg-no-repeat"
      />
    </div>
  );
};

export default Page;
