'use client'
import { useEffect, useState } from 'react'

import AddIssue from './AddIssue'
import Search from './Search'
import StatusFilter from './StatusFilter'
import SortToggle from './SortToggle'
import { Issue, IssueStatusWIthAll } from '@/lib/types'
import EmptyList from './EmptyList'
import LoadingSpinner from './LoadingSpinner'
import IssuesList from './IssuesList'
import { sortByDate } from '@/lib/sortByDate'

export default function IssuesPage({ parsedIssues }: { parsedIssues: Issue[] }) {
   const [issues, setIssues] = useState<Issue[] | null>(null)
   const [lastId, setLastId] = useState<number>(0)
   const [filteredIssues, setFilteredIssues] = useState<Issue[] | null>(null)
   const [status, setStatus] = useState<IssueStatusWIthAll>('all')
   const [isEditOpen, setIsEditOpen] = useState(false)

   useEffect(() => {
      function updateIssues() {
         const stored = localStorage.getItem('issues')
         let merged = parsedIssues
         if (stored) {
            try {
               const localIssues: Issue[] = JSON.parse(stored)
               merged = [...localIssues, ...parsedIssues.filter((pi) => !localIssues.some((li) => li.id === pi.id))]
            } catch {}
         }
         const sorted = sortByDate(merged, 'desc')
         setIssues(sorted)
         if (status === 'all') {
            setFilteredIssues(sorted)
         } else {
            setFilteredIssues(sorted.filter((issue) => issue.status.includes(status)))
         }
         if (sorted.length > 0) {
            const maxId = Math.max(...sorted.map((issue) => issue.id))
            setLastId(maxId)
         } else {
            setLastId(0)
         }
      }
      updateIssues()

      window.addEventListener('issues-updated', updateIssues)
      return () => {
         window.removeEventListener('issues-updated', updateIssues)
      }
   }, [parsedIssues, status])

   const handleEditOpenChange = (open: boolean) => setIsEditOpen(open)

   if (!issues) return <LoadingSpinner />

   return (
      <main>
         <article className='flex flex-col md:flex-row gap-4 mb-6 lg:mb-12 justify-between items-center'>
            <h2 className='text-xl tracking-widest text-primary-dark'>Issues</h2>
            <div className='flex items-center gap-4 flex-wrap'>
               <Search issues={issues} onResults={setFilteredIssues} />
               <StatusFilter issues={issues} onResults={setFilteredIssues} status={status} setStatus={setStatus} />
               <SortToggle issues={issues} onResults={setFilteredIssues} />
               <AddIssue lastId={lastId} />
            </div>
         </article>
         {filteredIssues && filteredIssues.length === 0 ? (
            <EmptyList />
         ) : (
            filteredIssues && (
               <IssuesList
                  filteredIssues={filteredIssues}
                  status={status}
                  setStatus={setStatus}
                  isEditOpen={isEditOpen}
                  onEditOpenChange={handleEditOpenChange}
               />
            )
         )}
      </main>
   )
}
