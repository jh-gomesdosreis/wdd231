// Replace with your OpenWeatherMap API key
const apiKey = 'ca95b73a044c4d90c1a99636d477f064';
const city = 'Vitória da Conquista'; // Use the Chamber's location (replace with actual city)

// Fetch current weather and forecast from OpenWeatherMap
async function fetchWeatherData() {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`;

    try {
        // Fetch current weather data
        const weatherResponse = await fetch(currentWeatherUrl);
        const weatherData = await weatherResponse.json();
        
        // Fetch 3-day forecast data
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Update the DOM with current weather
        document.getElementById('temp').textContent = weatherData.main.temp;
        document.getElementById('description').textContent = weatherData.weather[0].description;

        // Update the DOM with 3-day forecast
        const forecastList = document.getElementById('forecast-list');
        forecastList.innerHTML = ''; // Clear existing data

        // Loop through forecast data (8 data points per day for a 3-hour interval)
        for (let i = 0; i < 24; i += 8) {
            const forecastItem = forecastData.list[i];
            const date = new Date(forecastItem.dt_txt).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            });
            const temp = forecastItem.main.temp;

            const listItem = document.createElement('li');
            listItem.textContent = `${date}: ${temp}°C`;
            forecastList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Call the function to fetch and display the weather data
fetchWeatherData();
