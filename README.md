# City Information Application

## Overview

This application provides a REST API and a React front-end to manage city information, combining data from the REST Countries API and OpenWeatherMap API.

---

## Backend API

### Operations

- **Add City**  
    - Creates a new city record in the local SQL database  
    - Includes: city name, state, country, tourist rating, date established, and estimated population  
    - Generates a unique city ID

- **Update City**  
    - Updates the rating, date established, and estimated population of a city by its ID

- **Delete City**  
    - Deletes a city by its ID

- **Search City**  
    - Searches for cities by name and returns detailed information, including:  
        - City ID  
        - Name  
        - State (geographic sub-region)  
        - Country  
        - Tourist rating (1-5)  
        - Date established  
        - Estimated population  
        - 2-digit country code  
        - 3-digit country code  
        - Currency code  
        - Weather information for the city  
    - If multiple matches are found, the API returns information for all matches  
    - If the city is not stored locally, no results are returned

---

## Frontend UI

- Enables users to search for cities by name
- Allows users to perform CRUD (Create, Read, Update, Delete) operations on city records

---

## Unit Testing

- Unit tests are provided for both the backend API and the frontend UI to ensure core functionalities work as expected.
- Backend tests cover API endpoints and database operations.
- Frontend tests verify UI components and user interactions.

---

## APIs Used

- [REST Countries API](https://restcountries.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

## Database

- Uses a local SQL database to store city records


## Live Demo

- [City Explorer](https://city-explorer-1-lmga.onrender.com/)
