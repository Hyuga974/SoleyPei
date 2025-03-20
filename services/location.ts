import { Coord, LocationData, LocationInfo } from "@/models/coodrinate";
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
      const location : LocationData  = await response.json();
      return location;
    } catch (error) {
      console.error("Error fetching city data:", error);
      return null;
    }
  }

export async function getCities(name : string): Promise< LocationInfo[] | null> {
    const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey; 

    if (!apiKey) {
        console.error("OpenWeather API key is missing.");
        return null;
    }

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`;
    console.log("Request in progress...");
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Waiting for JSON response...");
        const location : LocationInfo[]  = await response.json();
        console.log("Request succeeded with JSON response")
        let allState : string[] = []
        return location.filter((city) => {
            if (!allState.includes(city.state)){
                allState.push(city.state)
                return city
            }
        });
    } catch (error) {
        console.error("Error fetching city data:", error);
        return null;
    }
}