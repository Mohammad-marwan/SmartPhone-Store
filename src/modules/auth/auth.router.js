import { Router } from "express";
import { changePassword, confirmEmail, login, register, sendCode } from "./auth.controller.js";

const router = Router();

router.post("/register",register);
router.get("/confirmEmail/:token",confirmEmail);
router.post("/login",login);
router.post("/sendCode",sendCode);
router.patch("/changePassword",changePassword);

export default router;