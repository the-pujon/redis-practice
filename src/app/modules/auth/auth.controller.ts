import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./auth.service";

const signupUser = catchAsync(async (res, req) => {
  const result = await UserService.signupUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

export const UserController = {
  signupUser,
  //loginUser,
};
