import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { create , getAll,getActive , getDetails,remove} from "./version.controller.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";
import reviewRouter from './../review/review.router.js';

const router = Router();
router.use('/:versionId/review',reviewRouter)
router.post("/",auth(["admin"]),fileUpload(fileValidation.image).fields([
{name:'mainImage',maxCount:1},
{name:'subImage',maxCount:4}

]),create);

router.get("/",auth(["admin"]),getAll);
router.get("/active",getActive);
router.get("/:id",getDetails);
router.delete("/:id",auth(["admin"]),remove);


export default router;