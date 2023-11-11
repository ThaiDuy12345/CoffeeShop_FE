import { Account } from "./account.model"
import { Discount } from "./discount.model"

export class Ordering {
  id: string = ""
  status: 0 | 1 | 2 | 3 | 4 | -1 = 0
  date: number = new Date().getTime()
  shippingFee: number = 0
  price: number = 0
  paymentStatus: null | 0 | 1 | -1 | 2 | -2 = null
  note: string = ""
  cancelDescription: string = ""
  approveDescription: string = ""
  totalPrice: number = 0
  account: Account = new Account()
  updatedByAccount: Account = new Account()
  discount: Discount = new Discount()
}