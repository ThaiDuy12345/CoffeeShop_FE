import { Account } from "./account.model"

export class Support {
  id: string = ""
  reason: string = ""
  title: string = ""
  content: string = ""
  creationDate: number = new Date().getTime()
  supportStatus: boolean = false
  account: Account = new Account()
}