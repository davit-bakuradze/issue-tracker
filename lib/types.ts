export type IssueStatus = 'open' | 'closed' | 'in_progress'

export type IssueStatusWIthAll = IssueStatus | 'all'

export type Issue = {
   id: number
   title: string
   status: string
   updatedAt: string | null
   description: string
}
