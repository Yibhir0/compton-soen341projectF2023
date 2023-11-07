const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../server");

require("dotenv").config();

// Mock data testing MongoMemoryServer (see dbConn.js)
const { disconnectDB } = require("../dbConn");

describe('API user test', () => {

    afterAll(async () => {
        await disconnectDB();

    });

    // Testing get request for all users
    describe("GET /api/user/users", () => {
        it("should return all users", async () => {
            const res = await request(app).get("/api/user/users");
            expect(res.statusCode).toBe(200);
        });
    });

});