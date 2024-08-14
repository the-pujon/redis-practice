import { model, Schema } from "mongoose";
import { AuthStaticMethods, TUser } from "./auth.interface";
import bcrypt from "bcrypt";

const authSchema = new Schema<TUser, AuthStaticMethods>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  role: {
    type: String,
    default: "user",
  },
  totalBuy: {
    type: String,
  },
});

authSchema.post("save", function (doc, next) {
  doc.set("passwords", undefined, { strict: false });
  next();
});

authSchema.statics.isUserExist = async function (email: string) {
  return await AuthModel.findOne({ email }).select("+password");
};

authSchema.statics.isPasswordMatch = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const AuthModel = model<TUser, AuthStaticMethods>("User", authSchema);
