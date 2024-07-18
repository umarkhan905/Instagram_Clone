import { Router } from "express";
import {
  login,
  signup,
  logout,
  getCurrentUser,
  verifyUser,
  forgotPassword,
} from "../controllers/auth.controllers.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();

router.get("/me", protectRoutes, getCurrentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify", verifyUser);
router.patch("/reset-password", forgotPassword);

export default router;
