import { Account } from "./account.model"

export class Ordering {
  id: string = ""
  status: 0 | 1 | 2 | 3 | 4 | -1 = 0
  account: Account = new Account()
  orderingDate: number = new Date().getTime()
  totalPrice: number = 0
}