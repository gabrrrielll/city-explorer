export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  touristRating: number;
  dateEstablished: string;
  estimatedPopulation: number;
  countryCode2: string;
  countryCode3: string;
  currency: string;
  weather: { temp: number; description: string } | null;
}
