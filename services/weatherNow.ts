import { Coord } from "@/models/coodrinate";
import { WeatherData } from "@/models/weatherData";
import Constants from "expo-constants";



export async function getCurrentWeather(city: string): Promise<WeatherData | null> {
  const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey; 

  if (!apiKey) {
    console.error("OpenWeather API key is missing.");
    return null;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log("Request in progress...");
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WeatherData = await response.json();
    console.log("Request succeeded with JSON response")
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
export async function getCurrentWeatherFromCoord(coordinates: Coord): Promise<WeatherData | null> {
  const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey; 

  if (!apiKey) {
    console.error("OpenWeather API key is missing.");
    return null;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${apiKey}`;
  console.log("Request in progress...", apiUrl);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WeatherData = await response.json();
    console.log("Request succeeded with JSON response")
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}