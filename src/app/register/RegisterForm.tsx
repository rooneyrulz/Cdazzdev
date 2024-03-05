"use client";

import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import ErrorMessage from "../components/ErrorMessage";
import { registrationSchema } from "../validationSchema";
import Spinner from "../components/Spinner";

type RegisterForm = z.infer<typeof registrationSchema>;

export default function RegisterForm() {
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

  React.useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  const handleRegistration = async (data: RegisterForm) => {
    setSubmitting(true);

    try {
      const res = await axios.post("/api/register", data);
      if (res.status === 200) {
        setError("");
        router.push("/login");
        toast.success("You just registered, Let's login!");
      }
    } catch (error: any) {
      setError(error?.response?.data || "Something went wrong");
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
    </>
  );
}
