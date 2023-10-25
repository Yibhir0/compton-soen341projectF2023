
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


app.use(express.json());


/* Telling the application to use the PropertyRouter for any requests that start with "/api". */
app.use("/api", PropertyRouter);
app.use("/api/auth", authRouter);

// Router listening for root and responding with  Comptan real estate
app.get("/", (req, res) => {
  res.send("Comptan Real Estate");
});


(async () => {
  try {
      
    // Connect to database
    await connectDB()
    
  } catch (e) {
    console.error("could not connect");
    console.error(e.message);
    process.exit();
  }
  
})();

const server = app.listen(
  PORT,
  console.log(`Server started on port ${PORT}...`)
);
//We don't want to run the server if we don't connect to database.
// connectDB()
//   .then(() => {
//     app.listen(PORT, console.log("Server started on port 5000"));
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  module.exports = {app,server};