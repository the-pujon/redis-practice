import { Router } from "express";
import { TodoController } from "./todo.controller";

const router = Router()

router.get("/", TodoController.getTodoData)

export const TodoRoutes = router