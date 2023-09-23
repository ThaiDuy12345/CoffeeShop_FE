export class Notification {
  id: string = ""
  type: "VIEW" | "LINK" = "VIEW"
  link: string = ""
  content: string = ""
  userId: string = ""
  createdDate: string = new Date("23-09-2023").toString()
  isRead: boolean = false
}