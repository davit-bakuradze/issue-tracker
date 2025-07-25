import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
   title: 'Issues Tracker Mini-app',
   description: 'Issues Tracker Mini-app',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en'>
         <body className={`${poppins.className} antialiased min-h-screen`}>{children}</body>
      </html>
   )
}
