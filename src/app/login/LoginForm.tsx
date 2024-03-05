"use client";

import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { loginSchema } from "../validationSchema";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = React.useState("");
  const [isSubmitting, setSubmitting] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  const handleRegistration = async (data: LoginForm) => {
    setSubmitting(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.status !== 200) {
        setError(res?.error || "Something went wrong");
      }

      if (res?.status === 200) {
        setError("");
        router.push("/profile");
      }
    } catch (error: any) {
      setError(error?.response?.data?.error || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ErrorMessage scope="server">{error}</ErrorMessage>
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => handleRegistration(data))}
      >
        <TextField.Root>
          <TextField.Input
            size="3"
            placeholder="Email"
            {...register("email")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            size="3"
            placeholder="Password"
            {...register("password")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <Button size="3" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Login
        </Button>
      </form>
    </>
  );
}
