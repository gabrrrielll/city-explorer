import express, { Router } from "express";
import {
  searchCities,
  addCity,
  updateCity,
  deleteCity,
} from "./cities.controller";

const router: Router = express.Router();

router.get("/cities", searchCities);
router.post("/cities", addCity);
router.put("/cities/:id", updateCity);
router.delete("/cities/:id", deleteCity);

export default router;
