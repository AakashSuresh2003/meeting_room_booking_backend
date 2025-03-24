const { Hall, TimeSlot } = require("../models/bookingModel");

const createHall = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name and location are required" });
        }

        const hallExists = await Hall.findOne({ name });
        if (hallExists) {
            return res.status(400).json({ message: "Hall already exists" });
        }

        const hall = await Hall.create({ name });
        res.status(201).json(hall);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getHalls = async (req, res) => {
    try {
        const halls = await Hall.find();
        res.status(200).json(halls);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteHall = async (req, res) => {
    try {
        const hall = await Hall.findById(req.params.id);
        if (!hall) {
            return res.status(404).json({ message: "Hall not found" });
        }

        await hall.deleteOne();
        res.status(200).json({ message: "Hall deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createHall, getHalls, deleteHall };
