import { NextResponse, NextRequest } from "next/server";
import connect from "@/config/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { z } from "zod";

const validationSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must not be empty!" })
    .max(255, {
      message: "Username must not be more than 255 characters long!",
    }),
  email: z.string().email({ message: "Invalid email id!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = validationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    await connect();

    const { username, email, password } = body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return NextResponse.json("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json("User registered successfully", { status: 200 });
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
