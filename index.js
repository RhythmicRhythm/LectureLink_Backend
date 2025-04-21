const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/courseRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleWare/errorMiddleware");
const session = require("express-session");
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://edu-tech-v1.vercel.app",
    ],
    credentials: true,
  })
);

// Routes Middleware
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

//Error Middleware
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
