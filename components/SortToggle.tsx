import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Issue } from '@/lib/types'
import { sortByDate } from '@/lib/sortByDate'

function SortToggle({ issues, onResults }: { issues: Issue[]; onResults: (results: Issue[]) => void }) {
   function handleStatusChange(order: 'asc' | 'desc') {
      const sorted = sortByDate(issues, order)
      onResults(sorted)
   }

   return (
      <Select onValueChange={handleStatusChange} aria-label='Sort issues by date'>
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
