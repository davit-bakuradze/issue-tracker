import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState, useRef } from 'react'
import { Issue } from '@/lib/types'
import { editIssue } from '@/lib/editIssue'

export function EditIssue({
   issue,
   triggerRef,
   onClose,
}: {
   issue: Issue | null
   triggerRef: React.RefObject<HTMLButtonElement>
   onClose: () => void
}) {
   const [form, setForm] = useState({ title: '', status: '', description: '' })
   const [showError, setShowError] = useState(false)
   const dialogCloseRef = useRef<HTMLButtonElement>(null)
   useEffect(() => {
      if (issue) {
         setForm({
            title: issue.title || '',
            status: issue.status || '',
            description: issue.description || '',
         })
      }
   }, [issue])

   const isFormChanged =
      issue && (form.title !== (issue.title || '') || form.status !== (issue.status || '') || form.description !== (issue.description || ''))

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if (!issue) return
      editIssue({
         id: issue.id,
         title: form.title,
         status: form.status,
         description: form.description,
         updatedAt: new Date().toISOString(),
      })
      window.dispatchEvent(new Event('issues-updated'))
      if (dialogCloseRef.current) {
         dialogCloseRef.current.click()
      }
   }
   useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
         if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault()
            const form = document.getElementById('edit-issue-form') as HTMLFormElement | null
            if (form) {
               form.requestSubmit()
            }
         }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
         window.removeEventListener('keydown', handleKeyDown)
      }
   }, [])
   return (
      <Sheet
         onOpenChange={(open) => {
            if (!open) {
               setTimeout(onClose, 0)
            }
         }}
      >
         <SheetTrigger asChild>
            <button ref={triggerRef} style={{ display: 'none' }}>
               Open
            </button>
         </SheetTrigger>
         <SheetContent className='w-[400px]'>
            <SheetHeader>
               <SheetTitle className='mt-4'>Edit Issue</SheetTitle>
               <SheetDescription>Edit the selected issue. Click save changes when you&apos;re done.</SheetDescription>
            </SheetHeader>
            <form id='edit-issue-form' onSubmit={handleSubmit} aria-label='Edit issue form'>
               <div className='grid gap-4 p-4'>
                  <input
                     id='edit-title'
                     value={form.title}
                     onChange={(e) => {
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                        setShowError(e.target.value.length > 0 && e.target.value.length < 3)
                     }}
                     className='border border-primary outline-primary p-2 text-sm rounded-lg'
                     aria-invalid={showError}
                     aria-describedby={showError ? 'edit-title-error' : undefined}
                  />
                  {showError && (
                     <span id='edit-title-error' className='text-red-600 text-xs mt-1'>
                        Title must be at least 3 characters.
                     </span>
                  )}
                  <Select defaultValue={form.status} onValueChange={(value) => setForm((prev) => ({ ...prev, status: value }))} aria-label='Status'>
                     <SelectTrigger className='w-full border border-primary outline-primary' aria-label='Select status'>
                        <SelectValue placeholder='status' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value='open'>Open</SelectItem>
                        <SelectItem value='in_progress'>In Progress</SelectItem>
                        <SelectItem value='closed'>Closed</SelectItem>
                     </SelectContent>
                  </Select>
                  <textarea
                     id='description'
                     name='description'
                     rows={10}
                     className='border border-primary outline-primary p-2 resize-none text-xs rounded-lg'
                     value={form.description}
                     onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
               </div>
               <SheetFooter>
                  <button
                     type='submit'
                     disabled={!isFormChanged || showError}
                     className='border border-primary text-primary font-bold p-2 rounded text-sm hover:bg-primary hover:text-white disabled:opacity-50 focus:outline-primary disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary dark:disabled:hover:bg-transparent'
                     aria-label='Save changes to issue'
                  >
                     Save changes
                  </button>
                  <SheetClose ref={dialogCloseRef} asChild>
                     <button
                        className='border border-red-800 text-red-800 font-bold p-2 rounded text-sm hover:bg-red-800 hover:text-white focus:outline-red-800 cursor-pointer'
                        aria-label='Close edit issue dialog'
                     >
                        Close
                     </button>
                  </SheetClose>
               </SheetFooter>
            </form>
         </SheetContent>
      </Sheet>
   )
}
