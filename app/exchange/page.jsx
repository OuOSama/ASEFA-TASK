'use client'
import { useState, useEffect } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'

const currencyNames = {
  USD: 'United States Dollar',
  AED: 'United Arab Emirates Dirham',
  AFN: 'Afghan Afghani',
  ALL: 'Albanian Lek',
  AMD: 'Armenian Dram',
  ANG: 'Netherlands Antillean Guilder',
  AOA: 'Angolan Kwanza',
  ARS: 'Argentine Peso',
  AUD: 'Australian Dollar',
  AWG: 'Aruban Florin',
  AZN: 'Azerbaijani Manat',
  BAM: 'Bosnia-Herzegovina Convertible Mark',
  BBD: 'Barbadian Dollar',
  BDT: 'Bangladeshi Taka',
  BGN: 'Bulgarian Lev',
  BHD: 'Bahraini Dinar',
  BIF: 'Burundian Franc',
  BMD: 'Bermudian Dollar',
  BND: 'Brunei Dollar',
  BOB: 'Bolivian Boliviano',
  BRL: 'Brazilian Real',
  BSD: 'Bahamian Dollar',
  BTN: 'Bhutanese Ngultrum',
  BWP: 'Botswana Pula',
  BYN: 'Belarusian Ruble',
  BZD: 'Belize Dollar',
  CAD: 'Canadian Dollar',
  CDF: 'Congolese Franc',
  CHF: 'Swiss Franc',
  CLP: 'Chilean Peso',
  CNY: 'Chinese Yuan',
  COP: 'Colombian Peso',
  CRC: 'Costa Rican Colón',
  CUP: 'Cuban Peso',
  CVE: 'Cape Verdean Escudo',
  CZK: 'Czech Koruna',
  DJF: 'Djiboutian Franc',
  DKK: 'Danish Krone',
  DOP: 'Dominican Peso',
  DZD: 'Algerian Dinar',
  EGP: 'Egyptian Pound',
  ERN: 'Eritrean Nakfa',
  ETB: 'Ethiopian Birr',
  EUR: 'Euro',
  FJD: 'Fijian Dollar',
  FKP: 'Falkland Islands Pound',
  FOK: 'Faroese Króna',
  GBP: 'British Pound Sterling',
  GEL: 'Georgian Lari',
  GGP: 'Guernsey Pound',
  GHS: 'Ghanaian Cedi',
  GIP: 'Gibraltar Pound',
  GMD: 'Gambian Dalasi',
  GNF: 'Guinean Franc',
  GTQ: 'Guatemalan Quetzal',
  GYD: 'Guyanese Dollar',
  HKD: 'Hong Kong Dollar',
  HNL: 'Honduran Lempira',
  HRK: 'Croatian Kuna',
  HTG: 'Haitian Gourde',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Shekel',
  IMP: 'Isle of Man Pound',
  INR: 'Indian Rupee',
  IQD: 'Iraqi Dinar',
  IRR: 'Iranian Rial',
  ISK: 'Icelandic Króna',
  JEP: 'Jersey Pound',
  JMD: 'Jamaican Dollar',
  JOD: 'Jordanian Dinar',
  JPY: 'Japanese Yen',
  KES: 'Kenyan Shilling',
  KGS: 'Kyrgyzstani Som',
  KHR: 'Cambodian Riel',
  KID: 'Australian Dollar (Kiribati)',
  KMF: 'Comorian Franc',
  KRW: 'South Korean Won',
  KWD: 'Kuwaiti Dinar',
  KYD: 'Cayman Islands Dollar',
  KZT: 'Kazakhstani Tenge',
  LAK: 'Lao Kip',
  LBP: 'Lebanese Pound',
  LKR: 'Sri Lankan Rupee',
  LRD: 'Liberian Dollar',
  LSL: 'Lesotho Loti',
  LYD: 'Libyan Dinar',
  MAD: 'Moroccan Dirham',
  MDL: 'Moldovan Leu',
  MGA: 'Malagasy Ariary',
  MKD: 'Macedonian Denar',
  MMK: 'Burmese Kyat',
  MNT: 'Mongolian Tögrög',
  MOP: 'Macanese Pataca',
  MRU: 'Mauritanian Ouguiya',
  MUR: 'Mauritian Rupee',
  MVR: 'Maldivian Rufiyaa',
  MWK: 'Malawian Kwacha',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  MZN: 'Mozambican Metical',
  NAD: 'Namibian Dollar',
  NGN: 'Nigerian Naira',
  NIO: 'Nicaraguan Córdoba',
  NOK: 'Norwegian Krone',
  NPR: 'Nepalese Rupee',
  NZD: 'New Zealand Dollar',
  OMR: 'Omani Rial',
  PAB: 'Panamanian Balboa',
  PEN: 'Peruvian Sol',
  PGK: 'Papua New Guinean Kina',
  PHP: 'Philippine Peso',
  PKR: 'Pakistani Rupee',
  PLN: 'Polish Zloty',
  PYG: 'Paraguayan Guarani',
  QAR: 'Qatari Rial',
  RON: 'Romanian Leu',
  RSD: 'Serbian Dinar',
  RUB: 'Russian Ruble',
  RWF: 'Rwandan Franc',
  SAR: 'Saudi Riyal',
  SBD: 'Solomon Islands Dollar',
  SCR: 'Seychellois Rupee',
  SDG: 'Sudanese Pound',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  SHP: 'Saint Helenian Pound',
  SLE: 'Sierra Leonean Leone',
  SLL: 'Sierra Leonean Leone',
  SOS: 'Somali Shilling',
  SRD: 'Surinamese Dollar',
  SSP: 'South Sudanese Pound',
  STN: 'São Tomé and Príncipe Dobra',
  SYP: 'Syrian Pound',
  SZL: 'Swazi Lilangeni',
  THB: 'Thai Baht',
  TJS: 'Tajikistani Somoni',
  TMT: 'Turkmenistani Manat',
  TND: 'Tunisian Dinar',
  TOP: 'Tongan Paʻanga',
  TRY: 'Turkish Lira',
  TTD: 'Trinidad and Tobago Dollar',
  TVD: 'Tuvaluan Dollar',
  TWD: 'New Taiwan Dollar',
  TZS: 'Tanzanian Shilling',
  UAH: 'Ukrainian Hryvnia',
  UGX: 'Ugandan Shilling',
  UYU: 'Uruguayan Peso',
  UZS: 'Uzbekistani Som',
  VES: 'Venezuelan Bolívar Soberano',
  VND: 'Vietnamese Đồng',
  VUV: 'Vanuatu Vatu',
  WST: 'Samoan Tala',
  XAF: 'Central African CFA Franc',
  XCD: 'East Caribbean Dollar',
  XDR: 'Special Drawing Rights',
  XOF: 'West African CFA Franc',
  XPF: 'CFP Franc',
  YER: 'Yemeni Rial',
  ZAR: 'South African Rand',
  ZMW: 'Zambian Kwacha',
  ZWL: 'Zimbabwean Dollar',
}

export default function Page() {
  const [fromCurrency, setFromCurrency] = useState('THB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [amount, setAmount] = useState(1)
  const [rates, setRates] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${fromCurrency}`
        )
        if (!response.ok) throw new Error('Failed to fetch currency rates')
        const data = await response.json()
        setRates(data.rates)
      } catch (error) {
        console.error('Error fetching rates:', error)
      }
    }
    fetchRates()
  }, [fromCurrency])

  const handleExchange = () => {
    if (rates[toCurrency]) {
      const convertedAmount = (amount * rates[toCurrency]).toFixed(2)
      setResult(Number(convertedAmount))
    }
  }

  return (
    <main className="bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 h-screen flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
          Currency Exchange
        </h1>

        <div className="flex items-center justify-around mb-6">
          <div className="flex flex-col items-center">
            <select
              className="select select-bordered w-40 border-indigo-300 focus:ring-2 focus:ring-indigo-500 rounded-lg"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currencyNames[currency]} ({currency})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setFromCurrency(toCurrency)
              setToCurrency(fromCurrency)
            }}
            className="bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition duration-300 text-white swap swap-rotate"
          >
            <input type="checkbox" className="hidden" />
            <div className="swap-on">
              <FaExchangeAlt
                width={40}
                height={40}
                className="h-10 w-10 fill-current text-white"
              />
            </div>
            <div className="swap-off">
              <FaExchangeAlt
                width={40}
                height={40}
                className="h-10 w-10 fill-current text-white"
              />
            </div>
          </button>

          <div className="flex flex-col items-center">
            <select
              className="select select-bordered w-40 border-indigo-300 focus:ring-2 focus:ring-indigo-500 rounded-lg"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currencyNames[currency]} ({currency})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 items-center">
          <div>
            <input
              className="input input-bordered w-full p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div>
            <input
              className="input input-bordered w-full p-3 rounded-lg shadow-md bg-gray-100 cursor-not-allowed font-bold"
              type="text"
              value={result !== null ? `${result} ${toCurrency}` : ''}
              disabled
            />
          </div>
        </div>

        <button
          onClick={handleExchange}
          className="btn w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          Convert Now
        </button>
      </div>
    </main>
  )
}
