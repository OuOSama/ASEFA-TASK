'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FaSort } from 'react-icons/fa6'
import { FaSortDown } from 'react-icons/fa6'
import { FaSortUp } from 'react-icons/fa6'
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa'
import { FaArrowCircleDown } from 'react-icons/fa'

export default function Page() {
  const [bitCoin, setBitCoin] = useState([])
  const [search, setSearch] = useState('')
  const [exchangeRate, setExchangeRate] = useState(0)
  const [sortOrder, setSortOrder] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const modalRef = useRef(null)

  const fetchExchangeRates = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
    )
    const data = await response.json()
    setBitCoin(data)
  }

  const fetchUSDToTHB = async () => {
    const response = await fetch('https://open.er-api.com/v6/latest/USD')
    const data = await response.json()
    setExchangeRate(data.rates.THB)
  }

  useEffect(() => {
    fetchExchangeRates()
    fetchUSDToTHB()

    const interval = setInterval(() => {
      fetchExchangeRates()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (!bitCoin.length)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    )

  const filteredCoins = bitCoin.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (sortOrder === 'high-low') {
      return b.current_price - a.current_price
    } else if (sortOrder === 'low-high') {
      return a.current_price - b.current_price
    }
    return 0
  })

  const handleMoreClick = (coin) => {
    setSelectedCoin(coin)
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close()
    }
    setSelectedCoin(null)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-32">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-around w-full mb-4">
          <input
            type="text"
            placeholder="Search for a coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-xs mr-2"
          />
          <div className="dropdown dropdown-right">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 btn-ghost text-2xl btn-circle"
            >
              <FaSort />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => setSortOrder('high-low')}>
                  <FaSortDown /> High - Low
                </a>
              </li>
              <li>
                <a onClick={() => setSortOrder('low-high')}>
                  <FaSortUp /> Low - High
                </a>
              </li>
            </ul>
          </div>
        </div>
        {sortedCoins.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full max-w-4xl">
              <thead>
                <tr>
                  <th></th>
                  <th>Icon</th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Current Price (USD)</th>
                  <th>Current Price (THB)</th>
                  <th>Updated</th>
                  <th>More Detail</th>
                </tr>
              </thead>
              <tbody>
                {sortedCoins.map((coin, index) => (
                  <tr key={coin.id}>
                    <th>{index + 1}</th>
                    <td>
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td>{coin.name}</td>
                    <td>{coin.symbol.toUpperCase()}</td>
                    <td>${coin.current_price.toLocaleString()}</td>
                    <td>
                      ${(coin.current_price * exchangeRate).toLocaleString()}
                    </td>
                    <td className="p-2">
                      {new Date(coin.last_updated).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleMoreClick(coin)}
                      >
                        More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Modal */}
            <dialog ref={modalRef} className="modal">
              <div className="modal-box">
                {selectedCoin && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={selectedCoin.image}
                          width={60}
                          height={60}
                          alt={selectedCoin.name}
                        />
                        <h1 className="font-bold text-3xl ml-5">
                          {selectedCoin.name}
                        </h1>
                      </div>
                      <p className="ml-auto">
                        {new Date(selectedCoin.last_updated).toLocaleString()}
                      </p>
                    </div>

                    <div className="stats shadow">
                      <div className="stat">
                        <div className="stat-figure text-green-400">
                          <FaArrowAltCircleUp className="inline-block h-8 w-8 stroke-current" />
                        </div>
                        <div className="stat-title">Total Up in 24h</div>
                        <div className="stat-value text-green-500">
                          {selectedCoin.high_24h}
                        </div>
                        <div className="stat-desc">USD</div>
                      </div>

                      <div className="stat">
                        <div className="stat-figure text-red-400">
                          <FaArrowAltCircleDown className="inline-block h-8 w-8 stroke-current" />
                        </div>
                        <div className="stat-title">Total Low in 24h</div>
                        <div className="stat-value text-red-500">
                          {selectedCoin.low_24h}
                        </div>
                        <div className="stat-desc">USD</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <form
                method="dialog"
                className="modal-backdrop"
                onSubmit={handleCloseModal}
              >
                <button type="button" onClick={handleCloseModal}>
                  close
                </button>
              </form>
            </dialog>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </div>
    </div>
  )
}
