export interface IssueLocal {
   id: number
   title: string
   status: 'open' | 'closed' | 'in_progress'
   updatedAt: string
   description?: string
}

export function addIssueToLocalStorage(issue: IssueLocal) {
   if (typeof window === 'undefined') return
   const stored = localStorage.getItem('issues')
   const issues: IssueLocal[] = stored ? JSON.parse(stored) : []
   issues.push(issue)
   localStorage.setItem('issues', JSON.stringify(issues))
}
