import User from "@/Schema/signup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { email, password, confirmPassword } = await req.json();

    if (!email || !password || !confirmPassword) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return Response.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Store the created user in a variable
    const newUser = await User.create({ email, password: hashedPassword });

    // ✅ Use newUser.email instead of user.email
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return Response.json({ message: "User registered successfully", token }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
