'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useRef, useEffect } from 'react'
import { addIssueToLocalStorage } from '@/lib/addIssueToLocalStorage'
import { IssueStatus } from '@/lib/types'

export default function AddIssue({ lastId }: { lastId: number }) {
   const [title, setTitle] = useState<string>('')
   const [showError, setShowError] = useState<boolean>(false)
   const [status, setStatus] = useState<IssueStatus>('open')
   const [description, setDescription] = useState<string>('')
   const isTitleValid = title.length >= 3
   const dialogCloseRef = useRef<HTMLButtonElement>(null)

   function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setTitle(e.target.value)
      setShowError(e.target.value.length > 0 && e.target.value.length < 3)
   }

   function handleStatusChange(value: IssueStatus) {
      setStatus(value)
   }

   function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      setDescription(e.target.value)
   }

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if (!isTitleValid) {
         setShowError(true)
         return
      }
      addIssueToLocalStorage({
         id: lastId + 1,
         title,
         status,
         updatedAt: new Date().toISOString(),
         description,
      })
      window.dispatchEvent(new Event('issues-updated'))
      setTitle('')
      setDescription('')
      setStatus('open')
      if (dialogCloseRef.current) {
         dialogCloseRef.current.click()
      }
   }

   useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
         if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault()
            const form = document.getElementById('add-issue-form') as HTMLFormElement | null
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
      <Dialog>
         <DialogTrigger asChild>
            <button
               className='border-2 h-9 border-border-primary rounded-md text-sm py-1 px-1.5 hover:shadow-md cursor-pointer focus:outline-primary '
               aria-label='Add new issue'
            >
               Add new
            </button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Add a new issue</DialogTitle>
               <DialogDescription>Add a new issue here. The description field is optional. Click save when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <form id='add-issue-form' className='grid gap-4' onSubmit={handleSubmit} aria-label='Add new issue form'>
               <div className='grid gap-3'>
                  <label htmlFor='title'>Title</label>
                  <input
                     id='title'
                     name='title'
                     className='border border-primary outline-primary p-2 text-sm rounded-lg'
                     value={title}
                     onChange={handleTitleChange}
                     aria-invalid={showError}
                     aria-describedby={showError ? 'title-error' : undefined}
                  />
                  {showError && (
                     <span id='title-error' className='text-red-600 text-xs mt-1'>
                        Title must be at least 3 characters.
                     </span>
                  )}
               </div>
               <div className='grid gap-3'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                     id='description'
                     name='description'
                     rows={5}
                     className='border border-primary outline-primary p-2 resize-none text-xs rounded-lg'
                     value={description}
                     onChange={handleDescriptionChange}
                  />
               </div>
               <Select defaultValue={status} onValueChange={handleStatusChange} aria-label='Status'>
                  <SelectTrigger className='w-full border border-primary outline-primary' aria-label='Select status'>
                     <SelectValue placeholder='status' />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value='open'>Open</SelectItem>
                     <SelectItem value='in_progress'>In Progress</SelectItem>
                     <SelectItem value='closed'>Closed</SelectItem>
                  </SelectContent>
               </Select>
               <DialogFooter>
                  <DialogClose asChild>
                     <button
                        ref={dialogCloseRef}
                        className='border border-red-800 text-red-800 font-bold p-2 rounded text-sm hover:bg-red-800 hover:text-white focus:outline-red-800 cursor-pointer'
                        aria-label='Cancel add issue'
                     >
                        Cancel
                     </button>
                  </DialogClose>
                  <button
                     type='submit'
                     className='border border-primary text-primary font-bold p-2 rounded text-sm hover:bg-primary hover:text-white disabled:opacity-50 focus:outline-primary disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary dark:disabled:hover:bg-transparent'
                     disabled={!isTitleValid}
                     aria-label='Save new issue'
                  >
                     Save
                  </button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
