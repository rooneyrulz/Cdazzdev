/* eslint-disable react/no-unescaped-entities */
import { Text, Heading, Link } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/profile");
  }

  return (
    <div className="max-w-xl m-auto">
      <Heading mb="5" size="6">
        Login
      </Heading>

      <LoginForm />

      <Text align="center" as="p" mt="5" color="gray">
        Don't have account? register{" "}
        <Link className="text-blue-500 hover:underline " href="/register">
          here
        </Link>
      </Text>
    </div>
  );
}
