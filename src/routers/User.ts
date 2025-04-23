import { Router } from "express";
import register from "../controller/User";

const router = Router();
router.post("/register", register);
export default router;
