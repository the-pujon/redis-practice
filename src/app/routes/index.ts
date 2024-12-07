import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TodoRoutes } from "../modules/todo/todo.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/todo",
    route: TodoRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
