import { Account } from "./account.model"
import { Product } from "./product.model"

export class Feedback{
  rate: number = 0
  comment: string = ""
  product: Product = new Product()
  creationDate: number = new Date().getTime()
  account: Account = new Account()
  active: boolean = true
}