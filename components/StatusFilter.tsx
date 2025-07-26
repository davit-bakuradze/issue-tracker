import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { IssueStatusWIthAll } from '@/lib/types'

function StatusFilter({ status, setStatus }: { status: IssueStatusWIthAll; setStatus: (status: IssueStatusWIthAll) => void }) {
   const router = useRouter()
   const searchParams = useSearchParams()

   function handleStatusChange(value: IssueStatusWIthAll) {
      setStatus(value)
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('status', value)
      router.replace(`?${params.toString()}`)
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
