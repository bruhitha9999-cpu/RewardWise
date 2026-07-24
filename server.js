const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cardRouter = require("./routes/cardRouter");

const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const redemptionRouter = require("./routes/redemptionRouter");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", cardRouter);
app.use("/api", redemptionRouter);

app.get("/", (req, res) => {
  res.send("RewardWise Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});