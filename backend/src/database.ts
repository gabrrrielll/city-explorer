import sqlite3 from "sqlite3";
import { City } from "./types";

const DBSOURCE = "db.sqlite";

const initialCities: Omit<City, "id">[] = [
  {
    name: "Paris",
    state: "Île-de-France",
    country: "France",
    touristRating: 5,
    dateEstablished: "259 BC",
    estimatedPopulation: 2141000,
  },
  {
    name: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    touristRating: 5,
    dateEstablished: "1457",
    estimatedPopulation: 13929000,
  },
  {
    name: "Sydney",
    state: "New South Wales",
    country: "Australia",
    touristRating: 4,
    dateEstablished: "1788",
    estimatedPopulation: 5312000,
  },
];

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE cities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            state text, 
            country text, 
            touristRating INTEGER,
            dateEstablished TEXT,
            estimatedPopulation INTEGER
        )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, inserting data
          console.log('Table "cities" created, seeding with initial data...');
          const insert =
            "INSERT INTO cities (name, state, country, touristRating, dateEstablished, estimatedPopulation) VALUES (?,?,?,?,?,?)";
          initialCities.forEach((city) => {
            db.run(insert, [
              city.name,
              city.state,
              city.country,
              city.touristRating,
              city.dateEstablished,
              city.estimatedPopulation,
            ]);
          });
        }
      },
    );
  }
});

export default db;
