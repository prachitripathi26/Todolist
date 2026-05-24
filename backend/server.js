require("dotenv").config(); // 🔥 TOP LINE

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// DEBUG
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// MIDDLEWARE
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ROUTES
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is working");
});

// DB CONNECT
mongoose.connect(
  "mongodb+srv://todolist:todo123@cluster0.44vxpaq.mongodb.net/todolist?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});