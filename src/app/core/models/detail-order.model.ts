import { Ordering } from "./ordering.model"
import { ProductSize } from "./product-size.model"

export class DetailOrder {
  id: string = ""
  quantity: number = 1
  productSize: ProductSize = new ProductSize()
  ordering: Ordering = new Ordering()
  subTotal?: number = 0

  constructor(item: DetailOrder){
    this.id = item.id
    this.quantity = item.quantity
    this.productSize = item.productSize
    this.ordering = item.ordering
    this.subTotal = this.quantity * this.productSize.price
  }
}