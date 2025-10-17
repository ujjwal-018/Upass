import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Vault from "@/Schema/vault";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userEmail = decoded.email;

    const { title, username, uri, password } = await req.json();

    if (!password || !title) {
      return NextResponse.json(
        { error: "At least Title and Password are required" },
        { status: 400 }
      );
    }

    const newVault = new Vault({
      title,
      username,
      uri,
      password,
      userEmail,
    });

    await newVault.save();

    return NextResponse.json(
      { message: "Vault created successfully", vault: newVault },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating vault:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await mongoose.connect(process.env.MONGO_URI);
    const email = decoded.email;

    const vaults = await Vault.find({ userEmail: email });

    return NextResponse.json({ vaults });
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
