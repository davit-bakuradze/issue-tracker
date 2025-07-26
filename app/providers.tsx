'use client'

import { ThemeProvider } from './theme-provider'

function Providers({ children }: { children: React.ReactNode }) {
   return (
      <div className='p-4 lg:p-8 space-y-4'>
         <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            {children}
         </ThemeProvider>
      </div>
   )
}
export default Providers
