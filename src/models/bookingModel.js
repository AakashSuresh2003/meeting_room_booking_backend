const mongoose = require("mongoose");
const moment = require("moment");

const hallSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

hallSchema.index({ name: 1 });

const timeSlotSchema = new mongoose.Schema({
    hall: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },
    date: { 
        type: Date, 
        required: true
    },
    startTime: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value) {
                return moment(value, "HH:mm", true).isValid();
            },
            message: "Invalid time format. Use HH:MM."
        }
    },
    endTime: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value) {
                return moment(value, "HH:mm", true).isValid();
            },
            message: "Invalid time format. Use HH:MM."
        }
    },
    isBooked: { type: Boolean, default: false }
});

timeSlotSchema.pre("save", function(next) {
    if (moment(this.startTime, "HH:mm").isSameOrAfter(moment(this.endTime, "HH:mm"))) {
        return next(new Error("End time must be after start time."));
    }
    next();
});

timeSlotSchema.index({ hall: 1, date: 1 });

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hall: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot", required: true, unique: true }
}, { timestamps: true }); 

bookingSchema.index({ userId: 1, hall: 1, slot: 1 });

hallSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
    await mongoose.model("TimeSlot").deleteMany({ hall: this._id });
    await mongoose.model("Booking").deleteMany({ hall: this._id });
    next();
});

const Hall = mongoose.model("Hall", hallSchema);
const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = { Hall, TimeSlot, Booking };
