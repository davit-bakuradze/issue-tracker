import IssuesPage from '@/components/IssuesPage'
import { parseIssuesFile } from '@/lib/parseIssues'

export default async function Page() {
   const issues = await parseIssuesFile()
   const lastId = issues.length > 0 ? issues[issues.length - 1].id : 0
   return (
      <div className='p-4 lg:p-8 space-y-4'>
         <IssuesPage parsedIssues={issues} />
      </div>
   )
}
