
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connectDB, disconnectDB } = require("./dbConn");

const app = express();


// Loading the environment variables from the .env file.
require("dotenv").config();

/* Allowing the frontend to access the backend. */
app.use(cors());

// Parsing the body to json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const PORT = process.env.PORT || 5000;
//const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/27017";

const PropertyRouter = require("./routes/property.route");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const passwordResetRouter = require('./routes/passwordReset.route');

const visitRouter = require("./routes/visit.route");
const offerRouter = require("./routes/offer.route");

app.use(express.json());


/* Telling the application to use the PropertyRouter for any requests that start with "/api". */
app.use("/api", PropertyRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/visit", visitRouter)
app.use("/api/offer", offerRouter)

// Router listening for root and responding with  Comptan real estate
app.get("/", (req, res) => {
  res.send("Comptan Real Estate");
});

connectDB()
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, console.log("Server started on port 5000"));
    }

  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { app };