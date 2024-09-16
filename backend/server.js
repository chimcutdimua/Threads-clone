require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connectDB");
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
connectDB();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
