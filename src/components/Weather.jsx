import React, { useEffect, useRef, useState } from 'react'

import './Weather.css'
import search_icon from '../assets/search 1.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.webp';

const Weather = () => {

  const inputRef= useRef()
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temprature: '',
    location: '',
    icon: clear_icon,
  });
  const [city, setCity] = useState('');

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":clear_icon,
    "03n":clear_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "010d":rain_icon,
    "010n":rain_icon,
    "013d":snow_icon,
    "013n":snow_icon

  }

  const search = async (cityName) => {
    if (cityName ===""){
      alert("enter your city name");
      return;

    }
   
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=27e7033873c40716389da99df5206dd9`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error)
    {
      setWeatherData(false);
      console.error("error")
    }
  }

  useEffect(() => {
    search("London");
  }, [])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          type="text" 
          ref={inputRef}
          placeholder='Search' 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img 
          className='image' 
          src={search_icon} 
          alt="" 
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ?<>
        <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temprature'>{weatherData.temprature}°c </p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt="" className='img1' />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt="" className='img2' />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
      
      </>:<>
      
      </>}
     
    </div>
  )
}

export default Weather;
