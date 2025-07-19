import { beforeAll, describe, it, expect } from "@jest/globals";
import request from "supertest";
import express from "express";
import cors from "cors";
import cityRouter from "./cities.router";
import db from "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", cityRouter);

// Clean up the database before tests
beforeAll((done) => {
  db.serialize(() => {
    db.run("DELETE FROM cities", done);
  });
});

describe("Cities API", () => {
  it("should add a new city", async () => {
    const newCity = {
      name: "Testville",
      state: "Testland",
      country: "Testlandia",
      touristRating: 4,
      dateEstablished: "2024",
      estimatedPopulation: 100,
    };

    const response = await request(app).post("/api/cities").send(newCity);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newCity.name);
  });
});
