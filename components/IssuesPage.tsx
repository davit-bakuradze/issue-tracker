'use client'
import { useEffect, useState } from 'react'
import formatRelativeTime from '@/lib/formatRelativeTime'
import formatStatusText from '@/lib/formatStatusText'
import getStatusClassName from '@/lib/getStatusClassName'
import { Issue } from '@/lib/parseIssues'
import AddIssue from './AddIssue'
import Search from './Search'

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

   if (!issues)
      return (
         <div className='flex justify-center items-center h-32'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary'></div>
         </div>
      )

   return (
      <>
         <header className='flex mb-4 lg:mb-8 justify-between items-center'>
            <h1 className='text-xl tracking-widest text-primary-dark'>Issues</h1>
            <Search issues={issues} onResults={setFilteredIssues} />
            <AddIssue lastId={lastId} />
         </header>
         {filteredIssues &&
            filteredIssues.map((issue) => (
               <main
                  key={issue.id}
                  className='grid grid-cols-[1fr_100px_70px] md:grid-cols-[1fr_200px_100px] gap-4 text-primary items-center justify-items-center'
               >
                  <h2 className='font-bold text-primary justify-self-start'>{issue.title}</h2>
                  <p
                     className={`${getStatusClassName(
                        issue.status
                     )} px-3 py-1 rounded inline-flex items-center text-white text-xs w-24 h-8 justify-center `}
                  >
                     {formatStatusText(issue.status)}
                  </p>
                  <p className='text-sm'>{issue.updatedAt ? formatRelativeTime(issue.updatedAt) : 'Unknown'}</p>
               </main>
            ))}
      </>
   )
}
