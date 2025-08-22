import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { create } from "./cart.controller.js";

const router = Router();

router.post('/',auth(['user']),create)


export default router;