import { useState } from 'react'

const citySuggestions = [
  // Cities in Thailand
  'Bangkok',
  'Samut Prakan',
  'Nonthaburi',
  'Pathum Thani',
  'Nakhon Nayok',
  'Ayutthaya',
  'Saraburi',
  'Nakhon Sawan',
  'Uthai Thani',
  'Phetchabun',
  'Lopburi',
  'Sing Buri',
  'Chai Nat',
  'Ang Thong',
  'Suphan Buri',
  'Kanchanaburi',
  'Ratchaburi',
  'Prachuap Khiri Khan',
  'Phetchaburi',
  'Samut Songkhram',
  'Nakhon Pathom',
  'Suan Phueng',
  'Nakhon Ratchasima',
  'Buri Ram',
  'Surin',
  'Sisaket',
  'Ubon Ratchathani',
  'Yasothon',
  'Amnat Charoen',
  'Chaiyaphum',
  'Khon Kaen',
  'Nong Bua Lam Phu',
  'Loei',
  'Nakhon Phanom',
  'Mukdahan',
  'Sakon Nakhon',
  'Kalasin',
  'Roi Et',
  'Khon Kaen',
  'Chaiyaphum',
  'Pattani',
  'Yala',
  'Narathiwat',
  'Songkhla',
  'Phatthalung',
  'Trang',
  'Satun',
  'Phuket',
  'Krabi',
  'Surat Thani',
  'Chumphon',
  'Ranong',
  'Phang Nga',
  'Nakhon Si Thammarat',
  'Prachuap Khiri Khan',
  'Chachoengsao',

  // Cities in Europe
  'London',
  'Paris',
  'Berlin',
  'Madrid',
  'Rome',
  'Amsterdam',
  'Vienna',
  'Brussels',
  'Lisbon',
  'Zurich',

  // Cities in North America
  'New York',
  'Los Angeles',
  'Toronto',
  'Mexico City',
  'Chicago',
  'Miami',
  'Houston',
  'Vancouver',
  'Montreal',
  'Boston',

  // Cities in South America
  'Sao Paulo',
  'Buenos Aires',
  'Rio de Janeiro',
  'Lima',
  'Bogota',
  'Caracas',
  'Santiago',
  'Quito',

  // Cities in Asia
  'Tokyo',
  'Beijing',
  'Seoul',
  'Mumbai',
  'Shanghai',
  'Jakarta',
  'Dhaka',
  'Manila',

  // Cities in Africa
  'Lagos',
  'Cairo',
  'Nairobi',
  'Johannesburg',
  'Addis Ababa',

  // Cities in Australia
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Adelaide',

  // Popular cities worldwide
  'Dubai',
  'Istanbul',
  'Moscow',
  'Bangkok',
  'Copenhagen',
  'Stockholm',
  'Oslo',
  'Helsinki',
]

export default function SearchWeather({ setWeather }) {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=03ecd012b0be2fde875287a6e60b9220`
      )

      if (!response.ok) {
        throw new Error('City not found')
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const inputValue = e.target.value
    setCity(inputValue)

    if (inputValue) {
      const filteredSuggestions = citySuggestions.filter((cityName) =>
        cityName.toLowerCase().includes(inputValue.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion)
    setSuggestions([])
  }

  return (
    <div className="flex flex-col items-center p-6">
      <form onSubmit={handleSearch} className="mb-4 relative">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <button type="submit" className="btn btn-primary ml-2">
          Search
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
      {loading && <span className="loading loading-spinner loading-md"></span>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
