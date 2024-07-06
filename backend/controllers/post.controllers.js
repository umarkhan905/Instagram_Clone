import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { text, textColor, bgColor, font, isPrivate, imageFilter } = req.body;
    let { image } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!text && !image) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image);
      image = result.secure_url;
    }

    const newPost = new Post({
      text,
      image,
      isPrivate,
      textColor,
      bgColor,
      font,
      imageFilter,
      user: userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in creating post", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveToDraft = async (req, res) => {
  try {
    const { text, textColor, bgColor, font, isPrivate, imageFilter } = req.body;
    let { image } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!text && !image) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image);
      image = result.secure_url;
    }

    const newPost = new Post({
      text,
      image,
      isPrivate,
      textColor,
      bgColor,
      font,
      imageFilter,
      isDraft: true,
      user: userId,
    });
    user.drafts.push(newPost._id);
    await user.save();
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in creating post", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postFromDraft = async (req, res) => {
  try {
    const { isPrivate = false } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (user._id.toString() !== post.user.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You cannot Post from draft" });
    }
    post.isDraft = false;
    post.isPrivate = isPrivate;
    await user.drafts.pull(id);
    await user.save();
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in postFromDraft", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveOrUnsavePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isPostSaved = user.savedPosts.includes(post._id);

    if (isPostSaved) {
      // Remove the post from the saved posts list of the user
      user.savedPosts.pull(post._id);
      await user.save();
      res.status(200).json({ message: "Post un-saved successfully" });
    } else {
      // Add the post from the saved posts list of the user
      user.savedPosts.push(post._id);
      await user.save();
      res.status(200).json({ message: "Post saved successfully" });
    }
  } catch (error) {
    console.log("Error in saveOrUnsavePost", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const likeOrUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isLikedPost = post.likes.includes(userId);

    if (isLikedPost) {
      // Unlike the post
      post.likes.pull(userId);
      user.likedPosts.pull(id);
      await user.save();
      await post.save();
      res.status(200).json({ message: "Post un-liked successfully" });
    } else {
      // Like the post
      post.likes.push(userId);
      user.likedPosts.push(id);

      const notification = await Notification.create({
        from: userId,
        to: post.user,
        type: "LIKE",
      });

      await user.save();
      await post.save();

      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log("Error in saveOrUnsavePost", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({ user: userId, comment });

    const notification = await Notification.create({
      from: userId,
      to: post.user,
      type: "COMMENT",
    });
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in CommentOnPost", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changePostToPublic = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You cannot change this post to public" });
    }

    post.isPrivate = true;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in changePostToPublic", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized: You cannot delete this post" });
    }

    if (post.image) {
      const imageId = post.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deleting post", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({ isPrivate: false, isDraft: false })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -securityQuestion.answer",
      })
      .populate({
        path: "comments.user",
        select: "-password -securityQuestion.answer",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getAllPost", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ _id: { $in: user.savedPosts } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password -securityQuestion.answer",
      })
      .populate({
        path: "comments.user",
        select: "-password -securityQuestion.answer",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getDraftPosts", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ _id: { $in: user.likedPosts } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password -securityQuestion.answer",
      })
      .populate({
        path: "comments.user",
        select: "-password -securityQuestion.answer",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getDraftPosts", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDraftPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ _id: { $in: user.drafts } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password -securityQuestion.answer",
      })
      .populate({
        path: "comments.user",
        select: "-password -securityQuestion.answer",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getDraftPosts", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: { $in: user.following } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password -securityQuestion.answer",
      })
      .populate({
        path: "comments.user",
        select: "-password -securityQuestion.answer",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getFollowingPosts", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -securityQuestion.answer",
      })
      .populate({
        path: "comments.user",
        select: "-password -securityQuestion.answer",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getPostsByUser", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPrivatePosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: user._id, isPrivate: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -securityQuestion.answer",
      })
      .populate({
        path: "comments.user",
        select: "-password -securityQuestion.answer",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getPrivatePosts", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
