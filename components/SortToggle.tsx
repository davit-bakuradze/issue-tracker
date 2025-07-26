import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function SortToggle({ value, onChange }: { value: 'asc' | 'desc'; onChange: (value: 'asc' | 'desc') => void }) {
   const router = useRouter()
   const searchParams = useSearchParams()

   function handleSortChange(order: 'asc' | 'desc') {
      onChange(order)
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('sort', order)
      router.replace(`?${params.toString()}`)
   }

   return (
      <Select value={value} onValueChange={handleSortChange} aria-label='Sort issues by date'>
         <SelectTrigger
            className='w-40  text-primary-dark border-2 border-border-primary rounded-md text-sm py-1 px-1.5 hover:shadow-md focus:shadow-none focus-visible:border-primary focus-visible:ring-0'
            aria-label='Select sort order'
         >
            <SelectValue placeholder='Sort' />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value='desc'>Newest ↔ Oldest</SelectItem>
            <SelectItem value='asc'>Oldest ↔ Newest</SelectItem>
         </SelectContent>
      </Select>
   )
}

export default SortToggle
