const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("./config/passport");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const eventRoutes = require("./routes/eventRoutes.js");
const ticketTypeRoutes = require("./routes/ticketTypeRoutes");

const testRoutes = require("./routes/testRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// now safe to use app
app.use(passport.initialize());
app.use("/api/ticket-types", ticketTypeRoutes);

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", ticketRoutes);

app.use("/api", eventRoutes);

app.get("/", (req, res) => {
  res.send("Smart Ticketing API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
