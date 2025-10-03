
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { BookOpen } from "lucide-react";

const forgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your inbox for instructions to reset your password.",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Password reset failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold text-primary font-headline">LibMan</span>
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
