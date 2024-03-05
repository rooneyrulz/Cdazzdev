import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Heading, Text, Strong } from "@radix-ui/themes";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Heading mb="2" size="8">
        Hello
      </Heading>
      <Text>
        Welcome <Strong>{session?.user?.email}</Strong>😀
      </Text>
    </>
  );
}
