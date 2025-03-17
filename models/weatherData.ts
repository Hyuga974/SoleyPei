export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface Weather{
  city: string;
  temp: number;
  humidity: number;
  description: string;
  icon: string;
}