import { Coord } from "@/models/coodrinate";
import { AllForecastData, ForecastData, WeatherData } from "@/models/weatherData";
import Constants from "expo-constants";

export async function getForecast(city: string): Promise<ForecastData[] | null> {
    // function to get the hourly forecast
    const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;
    if (!apiKey) {
        console.error("OpenWeather API key is missing.");
        return null;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    console.log("Request in progress...");
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: AllForecastData = await response.json();
        //filter HEre
        console.log("Filtered Forecast Data in progress ...", );
        const filteredData = filterForecast(data);
        return filteredData;
    } catch (error) {
        console.error("Error fetching forecast weather data:", error);
        return null;
    }
}

export async function getForecastFromCoord(coordinates: Coord): Promise<ForecastData[] | null> {
    // function to get the hourly forecast
    const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;
    if (!apiKey) {
        console.error("OpenWeather API key is missing.");
        return null;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${apiKey}`;
    console.log("Request in progress...");
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: AllForecastData = await response.json();
        const filteredData = filterForecast(data);
        console.log("Nb of filtered data: ", filteredData.length, " Nb before : ", data.list.length);
        return filteredData;
    } catch (error) {
        console.error("Error fetching forecast weather data:", error);
        return null;
    }
}

export function filterForecast(forecast : AllForecastData): ForecastData[] {
    // function to filter the forecast data
    const date = new Date();
    const currentHour = Math.floor(date.getHours()/3)+1*3;
    const formatHour = String(currentHour).padStart(2, '0')+":00";
        
    const filteredForecast = forecast.list.filter((data) => {
        return data.dt_txt.includes(formatHour);
    });
    
    return filteredForecast;
}