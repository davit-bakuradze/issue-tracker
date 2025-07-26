import IssuesPage from '@/components/IssuesPage'
import { parseIssuesFile } from '@/lib/parseIssues'

export default async function Page() {
   const issues = await parseIssuesFile()
   return <IssuesPage parsedIssues={issues} />
}
