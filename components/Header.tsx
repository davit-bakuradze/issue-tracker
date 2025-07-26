'use client'

import DarkModeToggle from './DarkModeToggle'

function Header() {
   function handleLogoClick() {
      window.location.href = '/'
   }
   return (
      <header className='pb-4 mb-4 lg:mb-8 flex justify-between items-center gap-4 border-b-2 border-gray-200 dark:border-gray-700'>
         <button
            onClick={handleLogoClick}
            aria-label='Go to home page'
            className='bg-transparent border-none p-0 m-0 cursor-pointer'
            style={{ all: 'unset' }}
         >
            <h1 className='capitalize text-xl lg:text-2xl tracking-widest leading-6 cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.30)]'>
               Issue tracker Mini-app
            </h1>
         </button>
         <DarkModeToggle />
      </header>
   )
}
export default Header
