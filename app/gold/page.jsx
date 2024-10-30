'use client'

import { AiFillGolden } from 'react-icons/ai'
import { useEffect, useState } from 'react'

export default function Page() {
  const [gold, setGold] = useState(null)

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response_gold = await fetch(
          'https://ba857d18-bb25-48dc-b306-2804a8c9d5a1-00-1n644cgkhb4s9.spock.replit.dev/gold',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (response_gold.ok) {
          const data_gold = await response_gold.json()
          setGold(data_gold)
        } else {
          console.log('Failed to fetch gold data:', response_gold.status)
        }
      } catch (error) {
        console.log('Error fetching ore data:', error)
      }
    }

    fetch_data()
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {gold ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto">
              {/* Card Today */}
              <div className="card bg-white shadow-lg flex-1 border border-gray-200 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
                <div className="card-body">
                  <h2 className="card-title flex justify-between items-center">
                    <span className="flex items-center">
                      <AiFillGolden className="text-5xl text-yellow-500" />
                      <span className="ml-2">GOLD</span>
                    </span>
                    <span className="text-sm text-gray-600">
                      {gold.gold_data.date} {gold.gold_data.time_min} AM
                    </span>
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="table table-striped w-full">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="text-left">#</th>
                          <th className="text-left">Type</th>
                          <th className="text-left">Buy</th>
                          <th className="text-left">Sell</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="hover:bg-gray-100">
                          <th>1</th>
                          <td>Gold bars</td>
                          <td>
                            {gold.gold_data.goldPrices.goldBar.buy || '-'} ฿
                          </td>
                          <td>
                            {gold.gold_data.goldPrices.goldBar.sell || '-'} ฿
                          </td>
                        </tr>
                        {/* row 2 */}
                        <tr className="hover:bg-gray-100">
                          <th>2</th>
                          <td>Gold jewelry</td>
                          <td>
                            {gold.gold_data.goldPrices.goldOrnament.sell || '-'}{' '}
                            ฿
                          </td>
                          <td>
                            {gold.gold_data.goldPrices.goldOrnament.buy || '-'}{' '}
                            ฿
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Card Type */}
              <div className="card bg-white shadow-lg flex-1 border border-gray-200 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
                <div className="card-body">
                  <h2 className="card-title flex justify-between items-center">
                    <span className="flex items-center">
                      <AiFillGolden className="text-5xl text-yellow-500" />
                      <span className="ml-2">Gold Purity Type</span>
                    </span>
                    <span className="text-sm text-gray-600">
                      {gold.gold_data.date} {gold.gold_data.time_min} AM
                    </span>
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="table table-striped w-full">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="text-left">#</th>
                          <th className="text-left">Type</th>
                          <th className="text-left">Buy</th>
                          <th className="text-left">Sell</th>
                          <th className="text-left">Sell / Gram</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gold.gold_data.goldTypes.map((type, index) => (
                          <tr className="hover:bg-gray-100" key={index}>
                            <th>{index + 1}</th>
                            <td>{type.name}</td>
                            <td>
                              {type.buyPricePerBaht === 'n/a'
                                ? '-'
                                : `${type.buyPricePerBaht}฿`}
                            </td>
                            <td>
                              {type.sellPricePerBaht === 'n/a'
                                ? '-'
                                : `${type.sellPricePerBaht}฿`}
                            </td>
                            <td>
                              {type.buyPricePerGram === 'n/a'
                                ? '-'
                                : `${type.buyPricePerGram}฿`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Card History */}
            <div className="card bg-white w-full shadow-lg border border-gray-200 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
              <div className="card-body">
                <h2 className="card-title flex items-center">
                  <AiFillGolden className="text-5xl text-yellow-500" />
                  <span className="ml-2">HISTORY</span>
                </h2>
                <div className="overflow-x-auto">
                  <table className="table table-striped w-full">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-left">#</th>
                        <th className="text-left">DateTime</th>
                        <th className="text-left">Buy</th>
                        <th className="text-left">Sell</th>
                        <th className="text-left">Jewelry Buy</th>
                        <th className="text-left">Jewelry Sell</th>
                        <th className="text-left">Gold Spot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gold.gold_data.history.map((entry, index) => (
                        <tr
                          key={index}
                          className={
                            entry.movementDirection === 'up'
                              ? 'bg-green-100'
                              : entry.movementDirection === 'down'
                              ? 'bg-red-100'
                              : ''
                          }
                        >
                          <th>{index + 1}</th>
                          <td>{entry.dateTime}</td>
                          <td>{entry.buyPrice || '-'}฿</td>
                          <td>{entry.sellPrice || '-'}฿</td>
                          <td>{entry.ornamentBuy || '-'}฿</td>
                          <td>{entry.ornamentSell || '-'}฿</td>
                          <td>{entry.goldSpot || '-'}฿</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </main>
    </div>
  )
}
