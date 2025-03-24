const express = require("express");
const { checkAvailability, bookHall, cancelBooking, getBookedHalls } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/availability", protect, checkAvailability);
router.post("/book", protect, bookHall);
router.delete("/cancel/:id", protect, cancelBooking);
router.get("/booked-halls", protect, getBookedHalls); 

module.exports = router;
