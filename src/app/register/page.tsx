"use client";

import React from "react";
import {
  TextField,
  Button,
  Callout,
  Text,
  Heading,
  Link,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../validationSchema";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type RegisterForm = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registrationSchema),
  });
  const [error, setError] = React.useState("");
  const [isSubmitting, setSubmitting] = React.useState(false);
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  React.useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/profile");
    }
  }, [router, sessionStatus]);

  React.useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  const handleRegistration = async (data: RegisterForm) => {
    setSubmitting(true);

    console.log(data);

    try {
      const res = await axios.post("/api/register", data);
      console.log(res);
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error: any) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error?.response?.data);
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
        Register
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
            placeholder="Username"
            {...register("username")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.username?.message}</ErrorMessage>

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
          Register
        </Button>
      </form>

      <Text align="center" as="p" mt="5" color="gray">
        Already have an account? Let's login {" "}
        <Link className="text-blue-500 hover:underline " href="/login">here</Link>
      </Text>
    </div>
  );
}
