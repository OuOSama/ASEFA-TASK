import localFont from 'next/font/local'
import '../styles/globals.css'

import { seo } from '@/config/seo'
import Sidebar from '@/components/Layout/SideBar/SideBar'

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = seo

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
