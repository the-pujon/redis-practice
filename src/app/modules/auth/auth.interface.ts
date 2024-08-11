import { Model } from "mongoose";

type TRole = "admin" | "user";

export interface TUser {
  name: string;
  email: string;
  passwords: string;
  role: TRole;
  totalBuy?: number;
}

export interface AuthStaticMethods extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
