import { REST_COUNTRIES_API_URL } from "./constants";

export const fetchCountryData = async (countryName: string) => {
  try {
    const response = await fetch(
      `${REST_COUNTRIES_API_URL}/name/${countryName}?fullText=true`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    const country = data[0];
    const currencyKey = Object.keys(country.currencies)[0];
    return {
      countryCode2: country.cca2,
      countryCode3: country.cca3,
      currency: `${currencyKey} (${country.currencies[currencyKey].name})`,
    };
  } catch (error) {
    console.error("Failed to fetch country data:", error);
    return null;
  }
};
