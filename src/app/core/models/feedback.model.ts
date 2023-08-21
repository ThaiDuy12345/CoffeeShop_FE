import { Account } from "./account.model"
import { Product } from "./product.model"

export class FeedBack{
  id: string = ""
  star: number = 0
  comment: string = ""
  product: Product = new Product()
  creationDate: Date = new Date()
  account: Account = new Account()
}