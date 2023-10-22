import { Ordering } from "./ordering.model"
import { Product } from "./product.model"

export class DetailOrder {
  id: string = ""
  quantity: number = 1
  product: Product = new Product()
  ordering: Ordering = new Ordering()
  subTotal?: number = 0

  constructor(item: DetailOrder){
    this.id = item.id
    this.quantity = item.quantity
    this.product = item.product
    this.ordering = item.ordering
    this.subTotal = this.quantity * this.product.price
  }
}