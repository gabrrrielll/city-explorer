import { OPENWEATHERMAP_API_KEY } from "./constants";
import { OPENWEATHERMAP_API_URL } from "./constants";

export const fetchWeatherData = async (
  cityName: string,
  countryCode: string,
) => {
  if (OPENWEATHERMAP_API_KEY === "NOT_API_KEY_CONFIGURED") {
    console.warn("OpenWeatherMap API key not configured.");
    return null;
  }
  try {
    const OPENWEATHERMAP = `${OPENWEATHERMAP_API_URL}?q=${cityName},${countryCode}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    const response = await fetch(OPENWEATHERMAP);
    if (!response.ok) return null;
    const data = await response.json();
    return {
      temp: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
};
