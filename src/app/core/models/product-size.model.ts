import { Product } from "./product.model"

export class ProductSize{
  id: string = ""
  size: "S" | "M" | "L" = "S"
  price: number = 0
  product: Product = new Product()
}