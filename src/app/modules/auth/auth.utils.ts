import jwt from "jsonwebtoken";
import { TUser } from "./auth.interface";

export const createToken = (
  jwtPayload: {
    email: string;
    role: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const omitPassword = (user: TUser) => {
  const plainUser = JSON.parse(JSON.stringify(user));
  delete plainUser.password;
  delete plainUser._v;

  return plainUser;
};
