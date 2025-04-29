import React, { useEffect, useRef, useState } from 'react';
import { Droplets, Wind, Search } from 'lucide-react'; // You need lucide-react installed

import search_icon from '../assets/search 1.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: '',
    icon: clear_icon,
  });

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": clear_icon,
    "03n": clear_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  };

  const search = async (cityName) => {
    if (cityName === "") {
      alert("Enter your city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=27e7033873c40716389da99df5206dd9`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Kathmandu");
  }, []);

  const handleSearch = () => {
    const city = inputRef.current.value;
    search(city);
  };

  const { temperature, humidity, windSpeed, location, icon } = weatherData;

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-800 text-white p-4">
      {/* Search Bar */}
      <div className="w-full max-w-md flex items-center gap-2 mb-8 mt-4">
        <div className="flex-1 relative rounded-full bg-white/90">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="w-full py-3 px-6 rounded-full text-gray-700 focus:outline-none"
          />
        </div>
        <button onClick={handleSearch} className="bg-white p-3 rounded-full">
          <Search className="h-5 w-5 text-indigo-800" />
        </button>
      </div>

      {/* Weather Icon */}
      <div className="my-6">
        <img src={icon} alt="weather icon" className="w-32 h-32" />
      </div>

      {/* Temperature and Location */}
      <div className="flex flex-col items-center my-6">
        <h1 className="text-8xl font-light mb-2">{temperature}°C</h1>
        <h2 className="text-4xl font-light">{location}</h2>
      </div>

      {/* Weather Details */}
      <div className="w-full max-w-md flex justify-between mt-8 mb-6 px-6">
        <div className="flex items-center gap-3">
          <div className="text-blue-200">
            <Droplets size={36} />
          </div>
          <div>
            <p className="text-3xl font-light">{humidity}%</p>
            <p className="text-xl text-blue-100">Humidity</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-blue-200">
            <Wind size={36} />
          </div>
          <div>
            <p className="text-3xl font-light">{windSpeed} km/h</p>
            <p className="text-xl text-blue-100">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
