"use client";

import React from "react";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../validationSchema";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";

type RegisterForm = z.infer<typeof validationSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(validationSchema),
  });
  const [error, setError] = React.useState("Sample validation error!");
  const [isSubmitting, setSubmitting] = React.useState(false);

  const handleRegistration = (formData:RegisterForm) => {
    setSubmitting(true);

    try {
      // 
    } catch (error) {
      // 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => handleRegistration(data))}
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

        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Register New User
        </Button>
      </form>
    </div>
  );
}
