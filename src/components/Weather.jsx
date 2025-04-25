import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

function Weather() {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01n": clearIcon,
        "01d": clearIcon,
        "02n": cloudIcon,
        "02d": cloudIcon,
        "03n": cloudIcon,
        "03d": cloudIcon,
        "04n": drizzleIcon,
        "04d": drizzleIcon,
        "09n": rainIcon,
        "09d": rainIcon,
        "10n": rainIcon,
        "10d": rainIcon,
        "13n": snowIcon,
        "13d": snowIcon,
    }

    const search = async (city) => {
        if (city === '') {
            alert('Enter city name')
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clearIcon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        } catch (error) {
            setWeatherData(false)
            console.error("Error in fetching weather data!",error)
        }
    }

    useEffect(() => {
        search("London")
    }, [])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search for a city' />
                <img src={searchIcon} alt="search" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? <>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temp'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidityIcon} alt="" />
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                    <div className="col">
                        <img src={windIcon} alt="" />
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </> : <></>}
        </div>
    )
}

export default Weather