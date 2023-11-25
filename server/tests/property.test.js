const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../server");

require("dotenv").config();

// Mock data testing MongoMemoryServer (see dbConn.js)
const { disconnectDB } = require("../dbConn");

describe('API Property test', () => {

  afterAll(async () => {
    await disconnectDB();
    // server.close();

  });

  // Testing get request for all properties
  describe("GET /api/properties", () => {
    it("should return all properties", async () => {
      const res = await request(app).get("/api/properties");
      expect(res.statusCode).toBe(200);
    });
  });

  //Testing post request for adding property ()
  describe("POST /api/property", () => {
    it("should create a property", async () => {
      const res = await request(app).post("/api/property").send({
        brokerID: "22",
        city: "Montreal",
        address: "2004 rue mackay",
        propertyType: "house",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.propertyType).toBe("house");
    });
  });

  //Testing get request for properties filter
  describe("GET /api/properties/:filter", () => {
    it("should return properties with filter conditions", async () => {
      const p1 = await request(app).post("/api/property").send({
        brokerID: "22",
        address: "2004 rue mackay",
        propertyType: "Rent",
        city: "Montreal",
        amenities: ["Parking"]
      });

      const res = await request(app).get("/api/properties/filter?address=2004 rue mackay&city=Montreal&propertyType=Rent&amenities[]=Parking");
      expect(res.statusCode).toBe(200);
      expect(res.body.propertyType).toBe(p1.propertyType);

    });
  });

});