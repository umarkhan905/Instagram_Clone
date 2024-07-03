import { Router } from "express";
import {
  login,
  signup,
  logout,
  getCurrentUser,
  forgotPassword,
} from "../controllers/auth.controllers.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();

router.get("/me", protectRoutes, getCurrentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/forget", forgotPassword);

export default router;
