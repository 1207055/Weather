const apiKey = 'de4f5d7e52d399347ff60081eeac220c'; 
let isCelsius = true; 

document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value;

    if (city) {
        fetchWeather(city);
    } else {
        displayErrorMessage('Please enter a city name');
    }
});

document.getElementById('unitToggle').addEventListener('change', function() {
    isCelsius = this.checked;
    const cityName = document.getElementById('cityName').textContent;
    if (cityName) {
        const city = cityName;
        fetchWeather(city); 
    }
});

function fetchWeather(city) {
    const units = isCelsius ? 'metric' : 'imperial';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayErrorMessage('City not found. Please provide a correct city name.');
            }
        })
        .catch(error => {
            displayErrorMessage('An error occurred. Please try again later.');
            console.error(error);
        });
}

function displayWeather(data) {
    document.getElementById('errorMessage').textContent = ''; 
    document.getElementById('cityName').textContent = data.name;

    const temperature = isCelsius ? `${data.main.temp}°C` : `${data.main.temp}°F`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}`;
    document.getElementById('weatherDescription').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherImg').src = iconUrl;

    
    const condition = data.weather[0].main.toLowerCase();
    setWeatherIcon(condition);
}

function setWeatherIcon(condition) {
    let iconPath = '';
    switch (condition) {
        case 'clear':
            iconPath = 'images/sun.png'; 
            break;
        case 'clouds':
            iconPath = 'images/cloud.png'; 
            break;
        case 'rain':
            iconPath = 'images/rain.png';
            break;
        default:
            iconPath = 'c:\Users\Dell\Downloads\stickers-sun-and-cloud.jpg-removebg-preview.png'; 
    }
    
}

function displayErrorMessage(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('weatherDescription').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('windSpeed').textContent = '';
    document.getElementById('weatherImg').src = '';
}
