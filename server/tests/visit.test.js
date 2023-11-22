const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../server");

require("dotenv").config();

// Mock data testing MongoMemoryServer (see dbConn.js)
const { disconnectDB } = require("../dbConn");

describe('API User test', () => {

    afterAll(async () => {
        await disconnectDB();

    });

    // Testing get request for all visits
    describe("GET /api/visit/visits", () => {
        it("should return all visits", async () => {
            const res = await request(app).get("/api/visit/visits");
            expect(res.statusCode).toBe(200);
        });
    });

    //Testing post request for adding visit ()
    describe("POST /api/visit/visit", () => {
        it("should create a visit", async () => {
            const res = await request(app).post("/api/visit/visit").send({
                brokerID: "22",
                email: "comptonfall2023@gmail.com",
                message: "Can I visit",
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.email).toBe("comptonfall2023@gmail.com");
        });
    });


});