const { Booking, TimeSlot, Hall } = require("../models/bookingModel");
const moment = require("moment");

const checkAvailability = async (req, res) => {
    try {
        const { hallId, date, startTime, endTime } = req.body;

        if (!hallId || !date || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingSlot = await TimeSlot.findOne({
            hall: hallId,
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        if (existingSlot) {
            return res.status(400).json({ message: "Slot is already booked" });
        }

        res.status(200).json({ message: "Slot is available" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const bookHall = async (req, res) => {
    try {
        const userId = req.user._id;
        const { hallId, date, startTime, endTime } = req.body;

        if (!userId || !hallId || !date || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const today = moment().startOf("day");
        const bookingDate = moment(date, "YYYY-MM-DD").startOf("day");

        if (!bookingDate.isValid() || bookingDate.isBefore(today)) {
            return res.status(400).json({ message: "Invalid or past date is not allowed" });
        }

        const now = moment();
        const startMoment = moment(`${date} ${startTime}`, "YYYY-MM-DD hh:mm A");
        const endMoment = moment(`${date} ${endTime}`, "YYYY-MM-DD hh:mm A");

        if (!startMoment.isValid() || !endMoment.isValid()) {
            return res.status(400).json({ message: "Invalid time format. Use hh:mm AM/PM" });
        }

        if (startMoment.isBefore(now) && bookingDate.isSame(today)) {
            return res.status(400).json({ message: "Cannot book for past time slots" });
        }

        if (endMoment.isBefore(startMoment) || endMoment.isSame(startMoment)) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        const existingSlot = await TimeSlot.findOne({
            hall: hallId,
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        if (existingSlot) {
            return res.status(400).json({ message: "Slot is already booked" });
        }

        const newSlot = await TimeSlot.create({
            hall: hallId,
            date,
            startTime,
            endTime,
            isBooked: true
        });

        const booking = await Booking.create({
            userId,
            hall: hallId,
            slot: newSlot._id
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const userId = req.user._id;

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        if (booking.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized: You can only cancel your own booking" });
        }

        await TimeSlot.findByIdAndDelete(booking.slot);
        await booking.deleteOne();

        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getBookedHalls = async (req, res) => {
    try {
        const bookedHalls = await Booking.find()
            .populate("hall", "name location")
            .populate("slot", "date startTime endTime") 
            .populate("userId", "name email"); 

        res.status(200).json(bookedHalls);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { checkAvailability, bookHall, cancelBooking, getBookedHalls };
