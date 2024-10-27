import { useEffect, useRef } from 'react'
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js'
import Image from 'next/image'

Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

export default function WeatherChart({ weather }) {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current && weather) {
      const temp = Math.round(weather.main.temp - 273.15)
      const feelsLike = Math.round(weather.main.feels_like - 273.15)
      const humidity = Math.round(weather.main.humidity)

      const data = {
        labels: ['Temperature', 'Feels Like', 'Humidity'],
        datasets: [
          {
            label: 'Weather Data',
            data: [temp, feelsLike, humidity],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      }

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ''
                const value = context.raw
                return `${label}: ${Math.round(value)}°C`
              },
            },
          },
        },
        cutout: '70%',
      }

      const chartInstance = new Chart(chartRef.current, {
        type: 'doughnut',
        data,
        options,
      })

      return () => {
        chartInstance.destroy()
      }
    }
  }, [weather])

  if (!weather) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    )
  }

  const temp = Math.round(weather.main.temp - 273.15)
  const description = weather.weather[0]?.description
  const iconCode = weather.weather[0].icon
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg w-80 mx-auto relative">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <Image src={iconUrl} alt="Weather Icon" width={64} height={64} />
        <span className="text-3xl font-bold text-gray-800 mt-[-10px]">
          {temp}°C
          {description && (
            <div className="mt-2 text-center text-sm text-gray-700">
              {description.charAt(0).toUpperCase() + description.slice(1)}
            </div>
          )}
        </span>
      </div>
    </div>
  )
}
