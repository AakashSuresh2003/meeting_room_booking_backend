const dotenv = require("dotenv").config();
const express = require('express')
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ConnectDB = require("./src/utils/db/db");
const userRoutes = require('./src/routes/userRoute');
const bookingRoutes = require('./src/routes/bookingRoutes');
const hallRoutes = require('./src/routes/hallRoutes')

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/bookings', bookingRoutes)
app.use('/api/v1/hallBookings', hallRoutes)

app.get("/", (req,res) => {
    res.status(200).json("Welcome to Meeting Room Booking");
});
  
ConnectDB();

const PORT = 5000;
app.listen(5000 , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});