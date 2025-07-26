import { useRouter, useSearchParams } from 'next/navigation'

function Search({ value, onChange }: { value: string; onChange: (value: string) => void }) {
   const router = useRouter()
   const searchParams = useSearchParams()
   function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
      const newValue = e.target.value
      onChange(newValue)
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      if (newValue) {
         params.set('q', newValue)
      } else {
         params.delete('q')
      }
      router.replace(`?${params.toString()}`)
   }

   return (
      <div>
         <input
            type='text'
            value={value}
            onChange={handleSearch}
            placeholder='Search...'
            className=' text-primary-dark  border-2 h-9 border-border-primary rounded-md text-sm py-1 px-1.5 hover:shadow-md focus:outline-primary focus:shadow-none'
            aria-label='Search issues by title'
         />
      </div>
   )
}

export default Search
