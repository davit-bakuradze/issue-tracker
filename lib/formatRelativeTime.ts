export default function formatRelativeTime(dateString: string) {
   if (!dateString) return 'N/A'
   const now = new Date()
   const updated = new Date(dateString)
   const diffMs = now.getTime() - updated.getTime()
   const diffSec = Math.floor(diffMs / 1000)
   const diffMin = Math.floor(diffSec / 60)
   const diffHour = Math.floor(diffMin / 60)
   const diffDay = Math.floor(diffHour / 24)

   if (diffDay > 0) return `${diffDay}d ago`
   if (diffHour > 0) return `${diffHour}h ago`
   if (diffMin > 0) return `${diffMin}m ago`
   return `${diffSec}s ago`
}
