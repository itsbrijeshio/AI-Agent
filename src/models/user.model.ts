import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    credits: { type: Number, default: 1000 }, // For API usage or pay-as-you-go
    lastLogin: { type: Date },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
