document.addEventListener('DOMContentLoaded', function(){
    const cityInput = document.getElementById('city-input')
    const getWeatherInfoBtn = document.getElementById('get-weather-btn')
    const weatherInfo = document.getElementById('weather-info')
    const cityNameDisplay = document.getElementById('city-name')
    const cityTempDisplay = document.getElementById('temperature')
    const cityDescDisplay = document.getElementById('description')
    const errMessage = document.getElementById('error-message')
    
    const api_key = "Your-API-key-here" // Will get this into the environment variables later. 

    getWeatherInfoBtn.addEventListener('click', async function(e){
        const cityName = cityInput.value.trim()
        
        if (cityName === "") return
        console.log(cityName);


        // Two important things in API calls:-
        // 1. It may throw an error
        // 2. Server/database is always in some other continent, so, it'll obviously take couple of seconds.

        try {
            const weatherData = await fetchWeatherData(cityName)
            displayWeatherData(weatherData)

        } catch (error) {
            displayError()
        }
        
    })


    async function fetchWeatherData(city)
    {
        // Gets us the weather data, if that city exists
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`

        const response = await fetch(url)

        // console.log(typeof response);
        // console.log(response.ok);

        if(!response.ok)
        {
            throw new Error("City Not Found!")
        }
        
        const data = await response.json()
        return data
    }

    function displayWeatherData(data)
    {
        // will display the data
        const {name, main, weather}=data
        
        console.log(weather[0])
        console.log(main);


        cityNameDisplay.textContent = `City: ${name}`
        document.getElementById('current-temp-value').textContent = `Current Temp: ${main.temp}°C`
        document.getElementById('feels-like').textContent = `Feels Like: ${main.feels_like}°C`
        cityDescDisplay.textContent = `Description: ${weather[0]['description']}`
        
        weatherInfo.classList.remove('hidden')
        errMessage.classList.add('hidden')
        cityInput.value = ""
    }

    function displayError()
    {
        // If there's some error:-
        // 1. Hide the data/info part
        weatherInfo.classList.add('hidden')

        // Display the error message:-
        errMessage.classList.remove('hidden')

        cityInput.value = "" 
    }
})