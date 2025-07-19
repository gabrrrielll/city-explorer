import { RequestHandler } from "express";
import db from "./database";
import { City } from "./types";
import { fetchWeatherData } from "./fetchWeatherData";
import { fetchCountryData } from "./fetchCountryData";

// --- Route Handlers ---
export const searchCities: RequestHandler = (req, res) => {
  const name = (req.query.name as string) || "";
  const sql = `SELECT * FROM cities WHERE name LIKE ?`;
  const params = [`%${name}%`];

  db.all(sql, params, async (err, rows: City[]) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const enhancedCities = await Promise.all(
      rows.map(async (city) => {
        const countryData = await fetchCountryData(city.country);
        const weatherData = countryData
          ? await fetchWeatherData(city.name, countryData.countryCode2)
          : null;
        return {
          ...city,
          ...countryData,
          weather: weatherData,
        };
      }),
    );

    res.json(enhancedCities);
  });
};

export const addCity: RequestHandler = (req, res) => {
  const {
    name,
    state,
    country,
    touristRating,
    dateEstablished,
    estimatedPopulation,
  } = req.body;
  if (!name || !country) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name and country" });
  }

  const sql =
    "INSERT INTO cities (name, state, country, touristRating, dateEstablished, estimatedPopulation) VALUES (?,?,?,?,?,?)";
  const params = [
    name,
    state,
    country,
    touristRating,
    dateEstablished,
    estimatedPopulation,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      ...req.body,
    });
  });
};

export const updateCity: RequestHandler = (req, res) => {
  const { touristRating, dateEstablished, estimatedPopulation } = req.body;
  const { id } = req.params;

  const sql = `UPDATE cities SET 
                 touristRating = COALESCE(?, touristRating), 
                 dateEstablished = COALESCE(?, dateEstablished), 
                 estimatedPopulation = COALESCE(?, estimatedPopulation) 
                 WHERE id = ?`;
  const params = [touristRating, dateEstablished, estimatedPopulation, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: `City with id ${id} not found.` });
    }
    res.json({
      message: "success",
      changes: this.changes,
    });
  });
};

export const deleteCity: RequestHandler = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cities WHERE id = ?";

  db.run(sql, id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: `City with id ${id} not found.` });
    }
    res.json({ message: "deleted", changes: this.changes });
  });
};
