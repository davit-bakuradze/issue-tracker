import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Issue, IssueStatusWIthAll } from '@/lib/types'
import { useState } from 'react'

function StatusFilter({ issues, onResults }: { issues: Issue[]; onResults: (results: Issue[]) => void }) {
   const [status, setStatus] = useState<IssueStatusWIthAll>('all')
   function handleStatusChange(value: IssueStatusWIthAll) {
      setStatus(value)
      if (value === 'all') {
         onResults(issues)
         return
      }
      const filtered = issues.filter((issue) => issue.status.includes(value))
      onResults(filtered)
   }

   return (
      <Select onValueChange={handleStatusChange}>
         <SelectTrigger className='w-32 outline-primary text-primary-dark border-2 border-border-primary rounded-md text-sm py-1 px-1.5 hover:shadow-md focus:visible:ring-primary focus:shadow-none focus-visible:ring-0'>
            <SelectValue placeholder='Status' />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='open'>Open</SelectItem>
            <SelectItem value='in_progress'>In Progress</SelectItem>
            <SelectItem value='closed'>Closed</SelectItem>
         </SelectContent>
      </Select>
   )
}
export default StatusFilter
