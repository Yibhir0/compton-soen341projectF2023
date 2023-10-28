const mongoose = require("mongoose");
const request = require("supertest");
const {app,server} = require("../server");

require("dotenv").config();

// Mock data testing MongoMemoryServer (see dbConn.js)
const { disconnectDB } = require("../dbConn");

describe('API test', () => {
 
  afterAll(() => {
    disconnectDB();
    server.close();
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
    });
  });

});