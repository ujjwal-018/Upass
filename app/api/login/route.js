import User from "@/Schema/signup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return Response.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
