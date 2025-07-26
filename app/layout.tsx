import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Header from '@/components/Header'

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
      <html lang='en' suppressHydrationWarning>
         <body className={`${poppins.className} antialiased min-h-screen`}>
            <Providers>
               <Header />
               {children}
            </Providers>
         </body>
      </html>
   )
}
