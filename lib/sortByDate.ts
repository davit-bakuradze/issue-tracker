import { Issue } from '@/lib/types'

export function sortByDate(issues: Issue[], order: 'asc' | 'desc'): Issue[] {
   return [...issues].sort((a, b) => {
      if (a.updatedAt == null && b.updatedAt == null) return 0
      if (a.updatedAt == null) return 1
      if (b.updatedAt == null) return -1
      if (order === 'asc') {
         return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      } else {
         return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
   })
}
