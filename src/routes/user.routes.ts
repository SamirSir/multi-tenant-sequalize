import { Router } from "express";
import { create } from "./../controllers/user.controller"

const router = Router();

router.get("/create", create);


export default router;
