// routes/user.routes.js
import { Router } from "express";
import userMethods from "../controllers/user.controller";

const router = Router();

router.post("/register", userMethods.registerUser);
router.post("/login", userMethods.loginUser);

export default router;
