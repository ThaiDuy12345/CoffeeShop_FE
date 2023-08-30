import { Account } from "./account.model"

export class Order {
  id: string = ""
  status: 0 | 1 | 2 | 3 | 4 | -1 = 0
  account: Account = new Account()
  orderDate: string = ""
  totalPrice: number = 0
}