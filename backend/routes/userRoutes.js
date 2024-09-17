const express = require("express");
const {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getProfileUser,
} = require("../controllers/userController");

const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.get("/profile/:username", getProfileUser);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

module.exports = router;
