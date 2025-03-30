import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState("");

  const API_KEY = "b897bd3e08cd7e53531aa030e2d19413"; // Replace with your API key

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      updateWeatherEffects(response.data.main.temp);
    } catch (err) {
      setError("City not found. Try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const updateWeatherEffects = (temp) => {
    if (temp > 30) {
      setBackground("hot");
    } else if (temp > 20) {
      setBackground("warm");
    } else if (temp > 10) {
      setBackground("mild");
    } else if (temp > 0) {
      setBackground("cold");
    } else {
      setBackground("freezing");
    }
  };

  // 🆕 Apply background class to <body> when background state changes
  useEffect(() => {
    document.body.className = background;
  }, [background]);

  return (
    <div className="container">
      <h1 className="title">🌡️ Weather App</h1>
      <div className="weather-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchWeather} className="weather-btn">
          Get Weather
        </button>
        {loading && <p className="loading">⏳ Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>🌡️ {weather.main.temp}°C</p>
            <p>☁️ {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
