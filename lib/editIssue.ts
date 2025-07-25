import { Issue } from './types'

export function editIssue(formData: Issue) {
   if (typeof window === 'undefined') return
   const stored = localStorage.getItem('issues')
   let issues: Issue[] = stored ? JSON.parse(stored) : []
   const idx = issues.findIndex((issue) => issue.id === formData.id)
   if (idx !== -1) {
      issues[idx] = { ...formData, updatedAt: new Date().toISOString() }
   } else {
      issues.push({ ...formData, updatedAt: new Date().toISOString() })
   }
   localStorage.setItem('issues', JSON.stringify(issues))
}
