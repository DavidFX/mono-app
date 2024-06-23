"use client";

// UI components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

// Validation
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Suapbase
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";

const registrationSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3).max(100),
    full_name: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
    confirmPassword: z.string().min(3).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPopup() {
  const { toast } = useToast();

  // Define the from
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      username: "",
      full_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission / registration
  const onSubmit = async (fields: z.infer<typeof registrationSchema>) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/confirm`,
        data: {
          username: fields.username,
        },
      },
    });

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Registration successful",
        description: "Check your email for the confirmation link",
        variant: "default",
      });

      console.log(data);
    }
  };

  return (
    <Dialog modal>
      <DialogTrigger>
        <Button>Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Register to start sharing your articles!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Full name" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
