/* eslint-disable react/no-unescaped-entities */
import { Heading, Text, Link } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/profile");
  }

  return (
    <div className="max-w-xl m-auto">
      <Heading mb="5" size="6">
        Register
      </Heading>

      <RegisterForm />

      <Text align="center" as="p" mt="5" color="gray">
        Already have an account? Let's login{" "}
        <Link className="text-blue-500 hover:underline " href="/login">
          here
        </Link>
      </Text>
    </div>
  );
}
