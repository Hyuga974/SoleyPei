import { Coord, LocationData } from "@/models/coodrinate";
import Constants from "expo-constants";


export async function getCity(location : Coord): Promise<LocationData | null> {
    const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey; 
  
    if (!apiKey) {
      console.error("OpenWeather API key is missing.");
      return null;
    }
  
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`;
    console.log("Request in progress...");
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Waiting for JSON response...");
      const location : LocationData  = await response.json();
      console.log("Request succeeded with JSON response", location)
      return location;
    } catch (error) {
      console.error("Error fetching city data:", error);
      return null;
    }
  }