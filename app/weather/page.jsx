// page.jsx
'use client'
import { useEffect, useState } from 'react'

import WeatherChart from '@/components/weather-component/WeatherChart'
import SearchWeather from '@/components/weather-component/SearchWearther'
import OtherWeatherInfo from '@/components/weather-component/OtherWeatherInfo'

export default function Page() {
  const [weather, setWeather] = useState(null)

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Bangkok&appid=03ecd012b0be2fde875287a6e60b9220`
      )

      if (response.ok) {
        const weather_data = await response.json()
        setWeather(weather_data)
      } else {
        console.log('Failed to fetch weather data:', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  useEffect(() => {
    fetchWeather()
    const intervalId = setInterval(() => {
      fetchWeather()
    }, 30000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <WeatherChart weather={weather} />
      <SearchWeather setWeather={setWeather} />
      <OtherWeatherInfo weather={weather} />
    </div>
  )
}
