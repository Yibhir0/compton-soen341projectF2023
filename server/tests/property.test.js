const mongoose = require("mongoose");
const request = require("supertest");
const {app} = require("../server");

require("dotenv").config();


const Property = require("../models/property.model");

//const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://comptan:Comptan6@cluster0.vhyfb6y.mongodb.net/compton";

/* Connecting to the database before each test. */
// beforeEach(async () => {
//     await mongoose.connect(MONGODB_URI);
//   });
  
  /* Closing database connection after each test. */
// afterEach(async () => {
//     await mongoose.connection.close();
//   });


const { connectDB, disconnectDB } = require("../dbConn");

describe('API test', () => {
  // beforeAll(() => {
  //   connectDB();
  // });



  afterAll(() => {
      disconnectDB();
  });
  
  // Testing get request for all properties
  describe("GET /api/properties", () => {
    it("should return all properties", async () => {
      const res = await request(app).get("/api/properties");
      expect(res.statusCode).toBe(200);
    });
  });

 
  //Testing post request for adding property
  describe("POST /api/property", () => {
    it("should create a property", async () => {
      const res = await request(app).post("/api/property").send({
        name: "REALTORS",
        address:"2004 rue mackay",
        propertyType: "house",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("REALTORS");
    });
  });

});