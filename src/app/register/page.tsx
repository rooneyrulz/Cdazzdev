"use client";

import { TextField, Button } from "@radix-ui/themes";

export default function RegisterPage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input size="3" placeholder="Username" />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input size="3" placeholder="Email" />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input size="3" placeholder="Password" />
      </TextField.Root>

      <Button>Register New User</Button>
    </div>
  );
}
 