import formatRelativeTime from '@/lib/formatRelativeTime'
import formatStatusText from '@/lib/formatStatusText'
import getStatusClassName from '@/lib/getStatusClassName'
import { useRef, useState } from 'react'
import { EditIssue } from './EditIssue'

import { Issue, IssueStatusWIthAll } from '@/lib/types'

function IssuesList({
   filteredIssues,
   status,
   setStatus,
   isEditOpen,
   onEditOpenChange,
}: {
   filteredIssues: Issue[]
   status: IssueStatusWIthAll
   setStatus: (status: IssueStatusWIthAll) => void
   isEditOpen?: boolean
   onEditOpenChange?: (open: boolean) => void
}) {
   const rowRefs = useRef<(HTMLDivElement | null)[]>([])
   const [editIssue, setEditIssue] = useState<Issue | null>(null)
   const editTriggerRef = useRef<HTMLButtonElement>(null)
   const [focusedIdx, setFocusedIdx] = useState<number | null>(null)

   function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>, idx: number, issue: Issue) {
      setFocusedIdx(idx)
      if (e.key === 'ArrowDown') {
         e.preventDefault()
         const next = rowRefs.current[idx + 1]
         if (next) next.focus()
      } else if (e.key === 'ArrowUp') {
         e.preventDefault()
         const prev = rowRefs.current[idx - 1]
         if (prev) prev.focus()
      } else if (e.key === 'Enter') {
         e.preventDefault()
         setEditIssue(issue)
         setTimeout(() => {
            if (editTriggerRef.current) {
               editTriggerRef.current.click()
            }
         }, 0)
      }
   }

   // Restore focus after EditIssue closes
   function handleEditClose() {
      if (focusedIdx !== null) {
         const row = rowRefs.current[focusedIdx]
         if (row) row.focus()
      }
      if (onEditOpenChange) onEditOpenChange(false)
   }

   function handleListKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
      if (e.key.toLowerCase() === 'o' && !isEditOpen) {
         setStatus(status === 'open' ? 'all' : 'open')
         e.preventDefault()
      }
   }

   return (
      <>
         <EditIssue issue={editIssue} triggerRef={editTriggerRef as React.RefObject<HTMLButtonElement>} onClose={handleEditClose} />
         <div role='list' aria-label='Issues list' tabIndex={-1} onKeyDown={handleListKeyDown}>
            {filteredIssues.map((issue, idx) => (
               <div
                  key={issue.id}
                  ref={(el) => {
                     rowRefs.current[idx] = el
                  }}
                  tabIndex={0}
                  role='listitem'
                  aria-selected={focusedIdx === idx}
                  onKeyDown={(e) => handleKeyDown(e, idx, issue)}
                  onFocus={() => setFocusedIdx(idx)}
                  className='grid grid-cols-[1fr_100px_70px] md:grid-cols-[1fr_200px_100px] gap-4 text-primary items-center justify-items-center focus:bg-gray-100 outline-none transition-colors duration-150 py-0.5 px-0.5 rounded'
               >
                  <h2 className='text-sm md:text-base font-bold text-primary justify-self-start'>{issue.title}</h2>
                  <p
                     className={`${getStatusClassName(
                        issue.status
                     )} px-3 py-1 rounded inline-flex items-center text-white text-xs w-24 h-8 justify-center `}
                  >
                     {formatStatusText(issue.status)}
                  </p>
                  <p className='text-sm'>{issue.updatedAt ? formatRelativeTime(issue.updatedAt) : 'Unknown'}</p>
               </div>
            ))}
         </div>
      </>
   )
}

export default IssuesList
