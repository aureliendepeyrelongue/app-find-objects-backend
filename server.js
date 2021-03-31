const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

var cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
// Import routes

app.use(express.static("./public"));

const commonRouter = require("./api/commonRouter");
const objectRouter = require("./api/objectRouter");
const userRouter = require("./api/userRouter");
const authRouter = require("./api/authRouter");

app.use(commonRouter);
app.use("/objects", objectRouter);
app.use("/users", userRouter);
app.use("/authentication", authRouter);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to db.")
);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
