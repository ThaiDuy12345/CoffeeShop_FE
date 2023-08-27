import { Account } from "./account.model"

export class Order {
  id: string = ""
  status: 0 | 1 | 2 | 3 = 0
  account: Account = new Account()
  orderDate: string = ""
  totalPrice: number = 0
}