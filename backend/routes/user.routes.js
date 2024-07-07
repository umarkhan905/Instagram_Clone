import { Router } from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
import {
  getUserProfile,
  editProfile,
  followOrUnfollow,
  togglePrivateAccount,
  getSuggestedUsers,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/profile/:username", protectRoutes, getUserProfile);
router.get("/suggested", protectRoutes, getSuggestedUsers);
router.post("/follow/:id", protectRoutes, followOrUnfollow);
router.patch("/private", protectRoutes, togglePrivateAccount);
router.patch("/update", protectRoutes, editProfile);

export default router;
