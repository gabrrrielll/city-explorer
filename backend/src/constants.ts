import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

export const OPENWEATHERMAP_API_KEY =
  process.env.OPENWEATHERMAP_API_KEY || "NOT_API_KEY_CONFIGURED";
export const OPENWEATHERMAP_API_URL =
  "https://api.openweathermap.org/data/2.5/weather";
export const REST_COUNTRIES_API_URL = "https://restcountries.com/v3.1";
