import { Callout, Text } from "@radix-ui/themes";

type ErrorMessageType = {
  children: React.ReactNode;
  scope?: string;
};

const ErrorMessage = ({ children, scope = "client" }: ErrorMessageType) => {
  if (!children) return null;

  return scope === "server" ? (
    <Callout.Root color="red" className="mb-5">
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  ) : (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
