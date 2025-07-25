import fs from 'fs/promises'
import path from 'path'
import { Issue } from './types'

export async function parseIssuesFile(): Promise<Issue[]> {
   const filePath = path.join(process.cwd(), 'public', 'issues.dat')
   const raw = await fs.readFile(filePath, 'utf-8')

   const lines = raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))

   const seen = new Set<number>()
   const issues: Issue[] = []

   for (const line of lines) {
      const parts = line.split('|')
      if (parts.length !== 5) continue

      const id = parseInt(parts[0])
      if (isNaN(id) || seen.has(id)) continue

      seen.add(id)

      const issue: Issue = {
         id,
         title: parts[1],
         status: parts[2],
         updatedAt: parts[3] ? parts[3] : null,
         description: parts[4],
      }

      issues.push(issue)
   }

   return issues
}
