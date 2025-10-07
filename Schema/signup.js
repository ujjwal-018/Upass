import { Schema,model } from "mongoose";
import mongoose from "mongoose";

const Signup = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.models.User || mongoose.model("User", Signup);

