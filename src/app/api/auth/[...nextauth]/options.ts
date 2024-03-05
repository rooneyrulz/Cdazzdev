import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import User from "@/models/User";
import connect from "@/config/db";
import { loginSchema } from "@/app/validationSchema";

type LoginForm = z.infer<typeof loginSchema>;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: LoginForm) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("Invalid credentials!");
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid credentials!");
          }

          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
};
