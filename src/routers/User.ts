import { Router } from "express";
import { Login, register, SignWithGoogle } from "../controller/User";

const router = Router();
router.post("/register", register);
router.post("/login", Login);
router.post("/google-login", SignWithGoogle);
export default router;
