import { Router } from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
import {
  deleteAllNotifications,
  deleteOneNotification,
  getAllNotifications,
  markAllAsRead,
  markAsRead,
} from "../controllers/notification.controllers.js";

const router = Router();

router.get("/", protectRoutes, getAllNotifications);
router.post("/all", protectRoutes, markAllAsRead);
router.post("/:id", protectRoutes, markAsRead);
router.delete("/all", protectRoutes, deleteAllNotifications);
router.delete("/:id", protectRoutes, deleteOneNotification);

export default router;
