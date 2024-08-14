import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./auth.interface";
import { AuthModel } from "./auth.model";
import { JwtPayload } from "jsonwebtoken";
import { createToken, omitPassword } from "./auth.utils";
import config from "../../config";

const signupUserIntoDB = async (payload: TUser) => {
  const existingUser = await AuthModel.isUserExist(payload.email);

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
  }

  const result = await AuthModel.create(payload);

  return omitPassword(result);
};

const loginUserService = async (payload: JwtPayload) => {
  const existingUser = await AuthModel.isUserExist(payload.email);

  console.log(existingUser);
  console.log(payload);

  if (!existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Email");
  }

  const correctPassword = await AuthModel.isPasswordMatch(
    payload.password,
    existingUser.password,
  );

  console.log(correctPassword);

  if (!correctPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Password");
  }

  const jwtPayload = {
    email: existingUser.email,
    role: existingUser.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "5h",
  );

  const loggedUserWithoutPassword = omitPassword(existingUser);

  return { token, user: loggedUserWithoutPassword };
};

export const UserService = {
  signupUserIntoDB,
  loginUserService,
};
