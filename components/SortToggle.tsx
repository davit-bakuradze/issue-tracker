import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Issue } from '@/lib/parseIssues'

function SortToggle({ issues, onResults }: { issues: Issue[]; onResults: (results: Issue[]) => void }) {
   function handleStatusChange(value: 'asc' | 'desc') {
      const sorted = [...issues].sort((a, b) => {
         if (a.updatedAt == null && b.updatedAt == null) return 0
         if (a.updatedAt == null) return 1
         if (b.updatedAt == null) return -1
         if (value === 'asc') {
            return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
         } else {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
         }
      })
      onResults(sorted)
   }

   return (
      <Select onValueChange={handleStatusChange}>
         <SelectTrigger className='w-40 outline-primary text-primary-dark border-2 border-border-primary rounded-md text-sm py-1 px-1.5 hover:shadow-md focus:visible:ring-primary focus:shadow-none focus-visible:ring-0'>
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
