import { Router } from "express";
import { create, deleted, get, getActive, getDetails, update } from "./phone.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/", auth(["admin"]), create);
router.get("/getActive", auth(["admin"]), getActive);
router.get("/", get);
router.get("/:id", getDetails);
router.delete("/:id", auth(["admin"]), deleted);
router.put("/:id", auth(["admin"]), update);

export default router;
