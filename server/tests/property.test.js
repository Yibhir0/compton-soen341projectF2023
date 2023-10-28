const mongoose = require("mongoose");
const request = require("supertest");
const {app,server} = require("../server");

require("dotenv").config();

// Mock data testing MongoMemoryServer (see dbConn.js)
const { disconnectDB } = require("../dbConn");

describe('API Property test', () => {
  
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
 
  //Testing post request for adding property ()
  describe("POST /api/property", () => {
    it("should create a property", async () => {
      const res = await request(app).post("/api/property").send({
        brokerID: "22",
        address:"2004 rue mackay",
        propertyType: "house",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.propertyType).toBe("house");
    });
  });

  describe("GET /api/properties/:id", () => {
    it("should return a specific property by ID", async () => {
      const res = await request(app).get(`/api/properties/6538b651a7ce4a04da76488f`);
      expect(res.statusCode).toBe(200);
    });
  
    it("should return a 404 status code for a non-existent property ID", async () => {
      const nonExistentId = "65399c5d505867d15099a3e6";
      const res = await request(app).get(`/api/properties/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
    });
  });

    //Testing get request for properties filter
    describe("GET /api/properties/filter", () => {
      it("should return properties with filter conditions", async () => {
        const p1 = await request(app).post("/api/property").send({
          brokerID: "22",
          address:"2004 rue mackay",
          propertyType: "Rent",
          city:"Montreal",
          amenities:[ "Parking"]
        });
      
        const res = await request(app).get("/api/properties/filter?address=2004 rue mackay&city=Montreal&propertyType=Rent&amenities[]=Parking");
        expect(res.statusCode).toBe(200);
        expect(res.body.propertyType).toBe(p1.propertyType);

      });
    });

});