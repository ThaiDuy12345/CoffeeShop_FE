import { Ordering } from "./ordering.model"
import { ProductSize } from "./product-size.model"

export class DetailOrder {
  quantity: number = 1
  productSize: ProductSize = new ProductSize()
  ordering: Ordering = new Ordering()
  subTotal: number = 0
}