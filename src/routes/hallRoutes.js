const express = require("express");
const { createHall, getHalls, deleteHall } = require("../controllers/hallController");
const {protect, isAdmin} = require('../middleware/authMiddleware')
const router = express.Router();

router.post("/",protect, isAdmin ,createHall);
router.get("/",protect, getHalls);
router.delete("/:id",protect, isAdmin , deleteHall);

module.exports = router;
