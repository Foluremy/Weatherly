import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null); // Stores weather data
  const [city, setCity] = useState('Lagos'); // Default city
  const [error, setError] = useState(null); // Stores errors
  const [loading, setLoading] = useState(false); // For loading state

  const API_KEY = 'acec4f406340be4d75bf4929f0c660bb'; 
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  // Fetch weather data
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      console.log('Response:', data);

      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(); // Fetch data when the component mounts or city changes
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setError(null); // Clear error when the user changes the city
  };

  const getWeatherImage = (condition) => {
    switch (condition) {
      case 'Rain':
        return 'https://media.istockphoto.com/id/498063665/photo/rainy-landscape.jpg?s=1024x1024&w=is&k=20&c=JmmkAKBNVz2QC2YaXGl8lLvYQYrn6SYXt_FPtN-8JUc=';
      case 'Clouds':
        return 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdWR5fGVufDB8fDB8fHww';
      case 'Clear':
        return 'https://images.unsplash.com/photo-1604228741406-3faa38f4907a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3Vubnl8ZW58MHx8MHx8fDA%3D';
      case 'Storm':
        return 'https://images.unsplash.com/photo-1594668165958-72d34a3fb90d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3Rvcm15fGVufDB8fDB8fHww';
      default:
        return 'https://images.unsplash.com/photo-1524623243236-187b50e18f9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ldXRyYWwlMjBza3l8ZW58MHx8MHx8fDA%3D';
    }
  };


  return (
    <div className="app">
      <h1>Weatherly</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>


      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2> 

          <div className="section temperature">
            <div className="title">Temperature</div>
            <p>{weather.main.temp}°C</p>
            <img
              className="icon"
              src={getWeatherImage(weather.weather[0].main)}
              alt={weather.weather[0].description}
            />
          </div>
          <hr></hr>
          <div className="section humidity">
            <div className="title">Humidity</div>
            <p>{weather.main.humidity}%</p>
            <img
              className="icon"
              src="https://images.unsplash.com/photo-1693946954353-2135de247103?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGh1bWlkaXR5fGVufDB8fDB8fHww"
              alt="Humidity"
            />
          </div>
          <hr></hr>
          <div className="section weather">
            <div className="title">Weather Condition</div>
            <p>{weather.weather[0].description}</p>            
            <img
              className="icon"
              src={getWeatherImage(weather.weather[0].main)}
              alt={weather.weather[0].description}
            />
          </div>
          <hr></hr>
          <div className="section windspeed">
            <div className="title">Wind Speed</div> 
            <p>{weather.wind.speed} m/s</p>
            <img
              className="icon"
              src="https://plus.unsplash.com/premium_photo-1711024166049-3c6c3bfc25eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2luZHl8ZW58MHx8MHx8fDA%3D"
              alt="Windy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
