import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { create } from "./review.controller.js";

const router = Router({mergeParams:true});


router.post("/",auth(['user']),create);


export default router;