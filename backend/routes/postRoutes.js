const express = require("express");
const {
  createPost,
  getPost,
  deletePost,
  likeAndUnlikePost,
  replyPost,
  getFeed,
} = require("../controllers/postController");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.get("/feed", protectRoute, getFeed);
router.get("/:id", getPost);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeAndUnlikePost);
router.post("/reply/:id", protectRoute, replyPost);

module.exports = router;
