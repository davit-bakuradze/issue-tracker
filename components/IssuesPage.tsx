'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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
   const searchParams = useSearchParams()
   const [lastId, setLastId] = useState<number>(0)
   const [filteredIssues, setFilteredIssues] = useState<Issue[] | null>(null)
   const initialQuery = {
      search: searchParams.get('q') ?? '',
      status: searchParams.get('status') ?? 'all',
      sort: searchParams.get('sort') ?? 'desc',
   }
   const [query, setQuery] = useState(initialQuery)
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
         let result = sortByDate(merged, query.sort as 'asc' | 'desc')
         if (query.status !== 'all') {
            result = result.filter((issue) => issue.status.includes(query.status))
         }
         if (query.search) {
            result = result.filter((issue) => issue.title.toLowerCase().includes(query.search.toLowerCase()))
         }
         setFilteredIssues(result)
         if (result.length > 0) {
            const maxId = Math.max(...result.map((issue) => issue.id))
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
   }, [parsedIssues, query])

   const handleEditOpenChange = (open: boolean) => setIsEditOpen(open)

   if (!filteredIssues) return <LoadingSpinner />

   return (
      <main>
         <article className='flex flex-col md:flex-row gap-4 mb-4 lg:mb-8 justify-between items-center'>
            <h2 className='text-xl tracking-widest text-primary-dark'>Issues</h2>
            <div className='flex items-center gap-4 flex-wrap'>
               <Search value={query.search} onChange={(val) => setQuery((q) => ({ ...q, search: val }))} />
               <StatusFilter status={query.status as IssueStatusWIthAll} setStatus={(status) => setQuery((q) => ({ ...q, status }))} />
               <SortToggle value={query.sort as 'asc' | 'desc'} onChange={(val) => setQuery((q) => ({ ...q, sort: val }))} />
               <AddIssue lastId={lastId} />
            </div>
         </article>
         {filteredIssues && filteredIssues.length === 0 ? (
            <EmptyList />
         ) : (
            filteredIssues && (
               <IssuesList
                  filteredIssues={filteredIssues}
                  status={query.status as IssueStatusWIthAll}
                  setStatus={(status) => setQuery((q) => ({ ...q, status }))}
                  isEditOpen={isEditOpen}
                  onEditOpenChange={handleEditOpenChange}
               />
            )
         )}
      </main>
   )
}
