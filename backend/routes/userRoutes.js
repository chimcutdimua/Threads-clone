const express = require("express");
const {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
} = require("../controllers/userController");

const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowUser);

module.exports = router;
