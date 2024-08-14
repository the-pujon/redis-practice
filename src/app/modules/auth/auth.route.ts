import { Router } from "express";
import { UserController } from "./auth.controller";

const router = Router();

router.post("signup", UserController.signupUser);
router.post("login", UserController.loginUser);

export const AuthRoutes = router;
