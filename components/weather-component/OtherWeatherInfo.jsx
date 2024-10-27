import {
  FaTemperatureHigh,
  FaWater,
  FaWind,
  FaCloud,
  FaSun,
  FaRegSun,
} from 'react-icons/fa' // Importing icons

export default function OtherWeatherInfo({ weather }) {
  const mainWeather = weather?.main || null
  const windData = weather?.wind || null
  const clouds = weather?.clouds || null
  const sys = weather?.sys || null
  const weatherDescription = weather?.weather[0]?.description || 'N/A'

  const temperature = mainWeather?.temp
    ? Math.round(mainWeather.temp - 273.15)
    : 0
  const feelsLike = mainWeather?.feels_like
    ? Math.round(mainWeather.feels_like - 273.15)
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 container mx-auto">
      <div className="stats shadow-lg rounded-lg bg-blue-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <FaTemperatureHigh className="text-3xl text-blue-600 mr-2" />
          <div>
            <div className="stat-title">Temperature</div>
            <div className="stat-value">{temperature}°C</div>
            <div className="stat-desc">Feels like {feelsLike}°C</div>
          </div>
        </div>
      </div>

      <div className="stats shadow-lg rounded-lg bg-green-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <FaWater className="text-3xl text-green-600 mr-2" />
          <div>
            <div className="stat-title">Humidity</div>
            <div className="stat-value">{mainWeather?.humidity ?? 'N/A'}%</div>
            <div className="stat-desc">Current humidity level</div>
          </div>
        </div>
      </div>

      <div className="stats shadow-lg rounded-lg bg-yellow-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <FaWind className="text-3xl text-yellow-600 mr-2" />
          <div>
            <div className="stat-title">Wind Speed</div>
            <div className="stat-value">{windData?.speed ?? 'N/A'} m/s</div>
            <div className="stat-desc">Current wind speed</div>
          </div>
        </div>
      </div>

      <div className="stats shadow-lg rounded-lg bg-red-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <FaCloud className="text-3xl text-red-600 mr-2" />
          <div>
            <div className="stat-title">Pressure</div>
            <div className="stat-value">
              {mainWeather?.pressure ?? 'N/A'} hPa
            </div>
            <div className="stat-desc">Atmospheric pressure</div>
          </div>
        </div>
      </div>

      <div className="stats shadow-lg rounded-lg bg-purple-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <FaCloud className="text-3xl text-purple-600 mr-2" />
          <div>
            <div className="stat-title">Cloud Coverage</div>
            <div className="stat-value">{clouds?.all ?? 'N/A'}%</div>
            <div className="stat-desc">Current cloud coverage</div>
          </div>
        </div>
      </div>

      <div className="stats shadow-lg rounded-lg bg-indigo-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <div className="text-3xl text-indigo-600 mr-2">🌤️</div>
          <div>
            <div className="stat-title">Weather Condition</div>
            <div className="stat-value">{weatherDescription}</div>
            <div className="stat-desc">Current weather condition</div>
          </div>
        </div>
      </div>

      <div className="stats shadow-lg rounded-lg bg-orange-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <FaSun className="text-3xl text-orange-600 mr-2" />
          <div>
            <div className="stat-title">Sunrise</div>
            <div className="stat-value">
              {sys?.sunrise
                ? new Date(sys.sunrise * 1000).toLocaleTimeString()
                : 'N/A'}
            </div>
            <div className="stat-desc">Sunrise time</div>
          </div>
        </div>
      </div>

      <div className="stats shadow-lg rounded-lg bg-pink-100 transition-transform duration-200 hover:scale-105">
        <div className="stat flex items-center">
          <FaRegSun className="text-3xl text-pink-600 mr-2" />
          <div>
            <div className="stat-title">Sunset</div>
            <div className="stat-value">
              {sys?.sunset
                ? new Date(sys.sunset * 1000).toLocaleTimeString()
                : 'N/A'}
            </div>
            <div className="stat-desc">Sunset time</div>
          </div>
        </div>
      </div>
    </div>
  )
}
