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
const transactionRoutes = require("./routes/transactionRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const testRoutes = require("./routes/testRoutes");
const razorpayRoutes = require("./routes/razorpayRoutes.js");
const roleRoutes = require("./routes/roleRoutes.js");
const adminUsersRoutes = require("./routes/adminUsersRoutes.js");

const app = express();

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB Error:", err));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://orboevents.vercel.app",
        "https://orboevents-staging.vercel.app",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cors());
app.use(express.json());

// now safe to use app
app.use(passport.initialize());
app.use("/api/ticket-types", ticketTypeRoutes);

app.use("/api/reservations", reservationRoutes);

app.use("/api/transactions", transactionRoutes);
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", adminUsersRoutes);
app.use("/api/tickets", ticketRoutes);

app.use("/api/roles", roleRoutes);

app.use("/api", eventRoutes);

app.use("/api/razorpay", razorpayRoutes);

app.get("/", (req, res) => {
  res.send("Smart Ticketing API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
