import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
  title: String,
  username: String,
  uri: String,
  password: String,
  userEmail: { type: String, required: true }, // 🔹 to link vault with user
});

export default mongoose.models.Vault || mongoose.model("Vault", vaultSchema);
