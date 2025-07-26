import { Issue } from '@/lib/types'
import { useState } from 'react'

function Search({ issues, onResults }: { issues: Issue[]; onResults: (results: Issue[]) => void }) {
   const [query, setQuery] = useState('')

   function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value
      setQuery(value)
      const filtered = issues.filter((issue) => issue.title.toLowerCase().includes(value.toLowerCase()))
      onResults(filtered)
   }

   return (
      <div>
         <input
            type='text'
            value={query}
            onChange={handleSearch}
            placeholder='Search...'
            className=' text-primary-dark  border-2 h-9 border-border-primary rounded-md text-sm py-1 px-1.5 hover:shadow-md focus:outline-primary focus:shadow-none'
         />
      </div>
   )
}

export default Search
