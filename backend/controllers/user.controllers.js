import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(username).select(
      "-password -securityQuestion.answer -drafts"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error in getUserProfile", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const togglePrivateAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isPrivate = !user.isPrivate;
    await user.save();
    res.status(200).json({ message: "Private account toggled successfully" });
  } catch (error) {
    console.log("Error in togglePrivateAccount", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const followOrUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const userToFollow = await User.findById(id);
    if (!userToFollow) {
      return res.status(404).json({ error: "User to follow not found" });
    }

    const isUserFollowed = currentUser.following.includes(id);

    if (isUserFollowed) {
      // Unfollow user
      currentUser.following.pull(id);
      userToFollow.followers.pull(userId);
      await currentUser.save();
      await userToFollow.save();
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // follow user
      currentUser.following.push(id);
      userToFollow.followers.push(userId);

      // Send notification to user
      const notification = await Notification.create({
        from: userId,
        to: id,
        type: "FOLLOW",
      });

      await currentUser.save();
      await userToFollow.save();
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log("Error in following or unfollow", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editProfile = async (req, res) => {
  try {
    const {
      username,
      fullname,
      email,
      currentPassword,
      newPassword,
      bio,
      links,
      isPrivate,
    } = req.body;
    let { profileImg, coverImg } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      (currentPassword && !newPassword) ||
      (newPassword && !currentPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both new password and current password",
      });
    }

    if (newPassword && currentPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect current password" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        const imgId = user.profileImg.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
      }
      const result = await cloudinary.uploader.upload(profileImg);
      profileImg = result.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        const imgId = user.coverImg.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
      }
      const result = await cloudinary.uploader.upload(coverImg);
      coverImg = result.secure_url;
    }

    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.links = links || user.links;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;
    user.isPrivate = isPrivate || user.isPrivate;

    await user.save();

    // password should be null in response
    user.password = null;
    user.securityQuestion.answer = null;

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in editProfile", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const users = await User.find({
      $and: [{ _id: { $ne: userId } }, { _id: { $nin: user.following } }],
    })
      .limit(10)
      .select("-password -securityQuestion.answer -drafts");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getSuggestedUsers", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
