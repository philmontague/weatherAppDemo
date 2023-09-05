document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('weather-id');
    const locationInput = document.getElementById('location');
    const weatherInfo = document.getElementById('weather-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const location = locationInput.value;

        // Call the Open Meteo API and retrieve weather data here
        fetchWeatherData(location)
            .then(data => {
                // Update the weatherInfo div with the weather data
                weatherInfo.innerHTML = `<h2>Weather in ${location}:</h2>
                                         <p>Temperature: ${data.current_temperature}°C</p>
                                         <p>Weather: ${data.description}</p>
                                         <p>Humidity: ${data.humidity}%</p>`;
            })
            .catch(error => {
                weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    });

    // Function to fetch weather data from the Open Meteo API
    function fetchWeatherData(location) {
        const apiKey = '1de659682446370acb79be9c6f22a4b3';
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`; 


        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to fetch weather data');
                }
                return response.json();
            })
            .then(data => {
                // Extract relevant weather data from the API response
                const currentWeather = data;
                return {
                    current_temperature: currentWeather.temperature,
                    description: currentWeather.weathercode,
                    humidity: currentWeather.humidity
                };
            });
    }
});

