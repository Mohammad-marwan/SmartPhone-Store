import { Router } from "express";
import { create, getOrder } from "./order.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/",auth(['user']),create);
router.get("/",auth(['user']),getOrder);


export default router;