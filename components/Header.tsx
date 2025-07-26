import DarkModeToggle from './DarkModeToggle'

function Header() {
   return (
      <header className='pb-4 flex justify-between items-center'>
         <h1 className='capitalize text-xl lg:text-2xl tracking-widest leading-6'>Issue tracker Mini-app</h1>
         <DarkModeToggle />
      </header>
   )
}
export default Header
