async function getWeather() {

    const city =
    document.getElementById("city").value;

    const weatherDiv =
    document.getElementById("weather");

    if(city === "")
    {
        weatherDiv.innerHTML =
        "<p>Please enter a city name.</p>";
        return;
    }

    try {

        // Get coordinates from city name
        const geoResponse =
        await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData =
        await geoResponse.json();

        if(!geoData.results)
        {
            weatherDiv.innerHTML =
            "<p>City not found!</p>";
            return;
        }

        const latitude =
        geoData.results[0].latitude;

        const longitude =
        geoData.results[0].longitude;

        const cityName =
        geoData.results[0].name;

        const country =
        geoData.results[0].country;

        // Get weather
        const weatherResponse =
        await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData =
        await weatherResponse.json();

        weatherDiv.innerHTML =
        `
        <h2>${cityName}, ${country}</h2>

        <p>🌡 Temperature:
        ${weatherData.current.temperature_2m}°C</p>

        <p>💧 Humidity:
        ${weatherData.current.relative_humidity_2m}%</p>

        <p>🌬 Wind Speed:
        ${weatherData.current.wind_speed_10m} km/h</p>
        `;

    }
    catch(error)
    {
        weatherDiv.innerHTML =
        "<p>Something went wrong!</p>";

        console.log(error);
    }
}