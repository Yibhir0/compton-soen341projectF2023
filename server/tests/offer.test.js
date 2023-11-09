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

    // Testing get request for all offers
    describe("GET /api/offer/offers", () => {
        it("should return all visits", async () => {
            const res = await request(app).get("/api/offer/offers");
            expect(res.statusCode).toBe(200);
        });
    });

    //Testing post request for adding offer ()
    describe("POST /api/offer/offer", () => {
        it("should create a offer", async () => {
            const res = await request(app).post("/api/offer/offer").send({
                offerPrice: "100000",
                deedSaleDate: "2023-12-11",
                moveInDate: "2023-12-22",
                buyerName: "Dom R",
                email: "dom@test.com",
                buyerAddress: "123 Test St",
                brokerName: "Broker Dom",
                brokerLiscence: "B12345",
                brokerAgency: "Remax",
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.offerPrice).toBe("100000");
            expect(res.body.deedSaleDate).toBe("2023-12-11");
            expect(res.body.moveInDate).toBe("2023-12-22");
            expect(res.body.buyerName).toBe("Dom R");
            expect(res.body.email).toBe("dom@test.com");
            expect(res.body.buyerAddress).toBe("123 Test St");
            expect(res.body.brokerName).toBe("Broker Dom");
            expect(res.body.brokerLiscence).toBe("B12345");
            expect(res.body.brokerAgency).toBe("Remax");
        });
    });
});
