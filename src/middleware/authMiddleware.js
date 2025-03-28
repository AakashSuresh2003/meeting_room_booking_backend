const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Not authorized, no token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) return res.status(401).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only" });
    }
    next();
};

module.exports = { protect, isAdmin };
