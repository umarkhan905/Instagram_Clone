import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const notifications = await Notification.find({ to: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "from",
        select: "username profileImg",
      });
    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getAllNotifications", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Notification.updateMany({ to: userId }, { $set: { isRead: true } });

    res.status(200).json({ message: "Notifications Read Successfully" });
  } catch (error) {
    console.log("Error in markAllAsRead", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const notification = await Notification.findById(notificationId).populate({
      path: "from",
      select: "username profileImg",
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to read this notification" });
    }
    notification.isRead = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in markAsRead", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "All Notifications Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteAllNotifications", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteOneNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this notification" });
    }
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteOneNotification", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
