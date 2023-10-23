import { Account } from "./account.model"

export class Ordering {
  id: string = ""
  status: 0 | 1 | 2 | 3 | 4 | -1 = 0
  account: Account = new Account()
  date: number = new Date().getTime()
  shippingFee: number = 0
  price: number = 0
  note: string = ""
  totalPrice: number = 0
}