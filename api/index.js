const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");

const app = express();

//--ENV
dotenv.config();

//--DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB connected...!"))
  .catch((err) => console.log(err));

//--MIDDLEWARE
app.use(express.json());

// app.use("/", (req, res) => {
//   console.log("Hello world.");
// });

//--ROUTE
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

//--SERVER
app.listen("5000", () => {
  console.log("Great,...Server running at port 5000");
});
