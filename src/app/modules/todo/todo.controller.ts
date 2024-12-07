import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import { TodoService } from "./todo.service"
import catchAsync from "../../utils/catchAsync"

export const getTodoData = catchAsync(async (req, res) => {
    const result = await TodoService.getTodoDataService()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Todo data fetched successfully",
        data: result,
    })
})

export const TodoController = { getTodoData }


