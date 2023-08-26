import { Order } from "./order.model"
import { Product } from "./product.model"

export class DetailOrder {
  id: string = ""
  quantity: number = 1
  product: Product = new Product()
  order: Order = new Order()
  subTotal?: number = 0

  constructor(item: DetailOrder){
    this.id = item.id
    this.quantity = item.quantity
    this.product = item.product
    this.order = item.order
    this.subTotal = this.quantity * this.product.price
  }
}