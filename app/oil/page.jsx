'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Page() {
  const [gas, setGas] = useState(null)

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await fetch(
          'https://2ea45e1c-1101-4dcd-a661-6c94748e4b4b-00-1v1mt5f26vqi3.janeway.replit.dev/oil',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.ok) {
          const gas_data = await response.json()
          setGas(gas_data)
        } else {
          console.log('Failed to fetch data:', response.status)
        }
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    fetch_data()
  }, [])

  const currentDateTime = new Date()
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const formattedDateTime = currentDateTime.toLocaleString('th-TH', options)

  return (
    <div className="container mx-auto p-8 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Gas Prices</h1>
      {gas ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(gas).map((stationKey) => (
            <div
              key={stationKey}
              className="p-4 border rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
            >
              <div className="flex items-center justify-between gap-4 mb-4 w-full">
                <div className="flex items-center gap-4">
                  <Image
                    src={gas[stationKey].iconUrl}
                    alt={stationKey}
                    className="h-12 w-12"
                    width={25}
                    height={25}
                  />
                  <h2 className="text-xl font-semibold">
                    {stationKey.replace('_DATA', '')}
                  </h2>
                </div>
                <span className="text-sm text-gray-500">
                  อัพเดต {formattedDateTime}
                </span>
              </div>

              <ul>
                {gas[stationKey]?.prices?.map((priceData) => (
                  <li
                    key={priceData.fuelType}
                    className="flex justify-between py-2"
                  >
                    <span>{priceData.fuelType}</span>
                    <span className="font-semibold">{priceData.price} ฿</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
    </div>
  )
}
