const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/AuthRoute");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB connected...!"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

// app.use("/", (req, res) => {
//   console.log("Hello world.");
// });


app.use("/api/auth", authRoute);

app.listen("5000", () => {
  console.log("Great,...Server running at port 5000");
});
