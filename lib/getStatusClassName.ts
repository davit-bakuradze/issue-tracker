export default function getStatusClassName(status: string) {
   switch (status) {
      case 'open':
         return 'bg-status-open'
      case 'in_progress':
         return 'bg-status-inprogress'
      case 'closed':
         return 'bg-status-closed'
      default:
         return ''
   }
}
