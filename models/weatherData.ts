export interface WeatherData {
  name: string;
  main: {
    temp: number; // unity Kelvin
    humidity: number; 
  };
  weather: {
    description: string; 
    icon: string; 
  }[];
}
