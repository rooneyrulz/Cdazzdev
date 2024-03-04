import { NextResponse } from "next/server";
import connect from "@/config/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const POST = async (request: any) => {
  try {
    const { username, email, password } = await request.json();

    await connect();

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse("User registered successfully", { status: 200 });
  } catch (error) {
    console.error("Error in user registration:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
