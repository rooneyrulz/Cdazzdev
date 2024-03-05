"use client";

import React from "react";
import { TextField, Button, Callout, Text, Heading, Link } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validationSchema";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
  const { data: session, status: sessionStatus } = useSession();

  React.useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/profile");
    }
  }, [sessionStatus, router]);

  console.log("session"+ session);
  console.log("session" + sessionStatus);

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

      console.log(res);

      if (res?.status !== 200) {
        setError(res?.error || "Something went wrong");
      }

      if (res?.status === 200) {
        setError("");
        router.push("/profile");
      }
    } catch (error: any) {
      setError(error?.response?.data?.error || "Something went wrong");
      console.log("error:" + error);
    } finally {
      setSubmitting(false);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-xl m-auto">
      <Heading mb="5" size="6">
        Login
      </Heading>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
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

      <Text align="center" as="p" mt="5" color="gray">
        Don't have account?  register {" "}
        <Link className="text-blue-500 hover:underline " href="/register">here</Link>
      </Text>
    </div>
  );
}
