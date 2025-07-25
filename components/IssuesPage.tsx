'use client'
import { useEffect, useState } from 'react'
import AddIssue from './AddIssue'
import Search from './Search'
import StatusFilter from './StatusFilter'
import SortToggle from './SortToggle'
import { Issue } from '@/lib/types'
import EmptyList from './EmptyList'
import LoadingSpinner from './LoadingSpinner'
import IssuesList from './IssuesList'

export default function IssuesPage({ parsedIssues }: { parsedIssues: Issue[] }) {
   const [issues, setIssues] = useState<Issue[] | null>(null)
   const [lastId, setLastId] = useState<number>(0)
   const [filteredIssues, setFilteredIssues] = useState<Issue[] | null>(null)

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
         setIssues(merged)
         setFilteredIssues(merged)
         if (merged.length > 0) {
            const maxId = Math.max(...merged.map((issue) => issue.id))
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
   }, [parsedIssues])

   if (!issues) return <LoadingSpinner />
   if (issues.length === 0) return <EmptyList />

   return (
      <>
         <header className='flex flex-col md:flex-row gap-4 mb-6 lg:mb-12 justify-between items-center'>
            <h1 className='text-xl tracking-widest text-primary-dark'>Issues</h1>
            <div className='flex items-center gap-4 flex-wrap'>
               <Search issues={issues} onResults={setFilteredIssues} />
               <StatusFilter issues={issues} onResults={setFilteredIssues} />
               <SortToggle issues={issues} onResults={setFilteredIssues} />
               <AddIssue lastId={lastId} />
            </div>
         </header>
         {filteredIssues && <IssuesList filteredIssues={filteredIssues} />}
      </>
   )
}
