import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Issue, IssueStatusWIthAll } from '@/lib/types'

function StatusFilter({
   issues,
   onResults,
   status,
   setStatus,
}: {
   issues: Issue[]
   onResults: (results: Issue[]) => void
   status: IssueStatusWIthAll
   setStatus: (status: IssueStatusWIthAll) => void
}) {
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
      <Select value={status} onValueChange={handleStatusChange} aria-label='Filter by status'>
         <SelectTrigger
            className='w-32 outline-primary text-primary-dark border-2 border-border-primary rounded-md text-sm py-1 px-1.5 hover:shadow-md focus-visible:border-primary focus-visible:ring-0'
            aria-label='Select status filter'
         >
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
