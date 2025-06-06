import { Router } from "express";
import { Login, register } from "../controller/User";

const router = Router();
router.post("/register", register);
router.post("/login", Login);
export default router;
