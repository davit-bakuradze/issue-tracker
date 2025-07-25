export default function formatStatusText(status: string) {
   switch (status) {
      case 'open':
         return 'Open'
      case 'closed':
         return 'Closed'
      case 'in_progress':
      case 'in-progress':
         return 'In Progress'
      default:
         return status
   }
}
