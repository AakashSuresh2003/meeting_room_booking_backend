const express = require("express");
const { registerUser, loginUser, logoutUser, getProfile, getUsers } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getProfile);
router.get("/listUsers", protect, isAdmin, getUsers);

module.exports = router;
