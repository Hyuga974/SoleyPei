# SOLEY PEI

Soley Pei is a weather app with a forecast on 5 days.
You can searhc any city by name and get the weather of the day.

## Installation
To install Soley Pei, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/Hyuga974/SoleyPei.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SoleyPei
   ```
3. Create an `app.config.js` file in the root directory of the project and add your OpenWeatherMap API key:
   ```javascript
   {
        "expo": {
            "name": "SoleyPei",
            "extra": {
            "openWeatherApiKey": "YOUR_API_KEY_HERE"
            }
        }
    }
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm start
   ```

## Usage
Once the development server is running, you can access the app in your web browser at `http://localhost:8081`. Use the search bar to enter the name of a city and view the current weather and the forecast for the next 5 days.

## Technologies Used
- React: A JavaScript library for building user interfaces.
- OpenWeatherMap API: A service that provides weather data.
- CSS: For styling the application.

## Version

The current version of Soley Pei is 1.0.0. However, the application is in update because the API change the way to get the weather data. The new version will be 2.0.0 and will be released soon.
