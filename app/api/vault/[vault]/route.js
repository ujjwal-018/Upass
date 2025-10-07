// api/vault/[vault]/route.js
import { NextResponse } from "next/server";
import Vault from "@/Schema/vault";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await mongoose.connect(process.env.MONGO_URI);

  const { vault } = params; // ✅ correct param name

  const get_user = await Vault.findById(vault);

  if (!get_user) {
    return NextResponse.json({ message: "Vault not found" }, { status: 404 });
  }

  return NextResponse.json(get_user); // ✅ return object directly
}

export async function DELETE(req, { params }) {
  await mongoose.connect(process.env.MONGO_URI);

  const { vault } = params; // the vault id

  try {
    const deletedVault = await Vault.findByIdAndDelete(vault);

    if (!deletedVault) {
      return NextResponse.json({ message: "Vault not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Vault deleted successfully" });
  } catch (error) {
    console.error("Error deleting vault:", error);
    return NextResponse.json({ message: "Error deleting vault" }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  await mongoose.connect(process.env.MONGO_URI);

  const { vault } = params; // ✅ vault ID from dynamic route
  const body = await req.json(); // get updated fields from request body

  try {
    const updatedVault = await Vault.findByIdAndUpdate(
      vault,
      body, // fields to update: title, username, uri, password
      { new: true, runValidators: true } // return updated doc and validate
    );

    if (!updatedVault) {
      return NextResponse.json({ message: "Vault not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Vault updated successfully",
      vault: updatedVault,
    });
  } catch (error) {
    console.error("Error updating vault:", error);
    return NextResponse.json({ message: "Error updating vault" }, { status: 500 });
  }
}