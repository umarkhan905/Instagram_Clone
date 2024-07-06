import { Router } from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
import {
  createPost,
  saveToDraft,
  postFromDraft,
  saveOrUnsavePost,
  likeOrUnlikePost,
  commentOnPost,
  changePostToPublic,
  deletePost,
  getAllPost,
  getDraftPosts,
  getSavedPosts,
  getLikedPosts,
  getFollowingPosts,
  getPostsByUser,
  getPrivatePosts,
} from "../controllers/post.controllers.js";

const router = Router();

router.get("/all", protectRoutes, getAllPost);
router.get("/draft", protectRoutes, getDraftPosts);
router.get("/save/:id", protectRoutes, getSavedPosts);
router.get("/likes/:id", protectRoutes, getLikedPosts);
router.get("/following", protectRoutes, getFollowingPosts);
router.get("/user/:username", protectRoutes, getPostsByUser);
router.get("/private", protectRoutes, getPrivatePosts);
router.post("/create", protectRoutes, createPost);
router.post("/draft", protectRoutes, saveToDraft);
router.post("/draft-post/:id", protectRoutes, postFromDraft);
router.post("/save/:id", protectRoutes, saveOrUnsavePost);
router.post("/like/:id", protectRoutes, likeOrUnlikePost);
router.post("/comment/:id", protectRoutes, commentOnPost);
router.post("/public/:id", protectRoutes, changePostToPublic);
router.delete("/:id", protectRoutes, deletePost);

export default router;
