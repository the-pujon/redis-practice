import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    path: "/services",
    route: "ServiceRoutes",
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
