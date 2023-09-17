import { Account } from "./account.model"
import { Product } from "./product.model"

export class FavoriteProduct{
  id: string = ""
  product: Product = new Product()
  account: Account = new Account()
}