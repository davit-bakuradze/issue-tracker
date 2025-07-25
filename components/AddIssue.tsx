'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useRef } from 'react'
import { addIssueToLocalStorage } from '@/lib/addIssueToLocalStorage'

export default function AddIssue({ lastId }: { lastId: number }) {
   const [title, setTitle] = useState<string>('')
   const [showError, setShowError] = useState<boolean>(false)
   const [status, setStatus] = useState<'open' | 'closed' | 'in_progress'>('open')
   const [description, setDescription] = useState<string>('')
   const isTitleValid = title.length >= 3
   const dialogCloseRef = useRef<HTMLButtonElement>(null)

   function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setTitle(e.target.value)
      setShowError(e.target.value.length > 0 && e.target.value.length < 3)
   }

   function handleStatusChange(value: 'open' | 'closed' | 'in_progress') {
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

   return (
      <Dialog>
         <DialogTrigger asChild>
            <button className='border-2 border-primary-dark rounded text-sm py-1 px-1.5 hover:shadow-md cursor-pointer focus:outline-primary '>
               Add new
            </button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Add a new issue</DialogTitle>
               <DialogDescription>Add a new issue here. The description field is optional. Click save when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <form className='grid gap-4' onSubmit={handleSubmit}>
               <div className='grid gap-3'>
                  <label htmlFor='title'>Title</label>
                  <input
                     id='title'
                     name='title'
                     className='border border-primary outline-primary p-2 text-sm rounded-lg'
                     value={title}
                     onChange={handleTitleChange}
                  />
                  {showError && <span className='text-red-600 text-xs mt-1'>Title must be at least 3 characters.</span>}
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
               <Select defaultValue={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className='w-full border border-primary outline-primary'>
                     <SelectValue placeholder='Theme' />
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
                     >
                        Cancel
                     </button>
                  </DialogClose>
                  <button
                     type='submit'
                     className='border border-primary text-primary font-bold p-2 rounded text-sm hover:bg-primary hover:text-white disabled:opacity-50 focus:outline-primary disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary'
                     disabled={!isTitleValid}
                  >
                     Save
                  </button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
