import { Category } from "./category.model"

export class Product{
  id: string = ""
  name: string = ""
  price: number = 0
  quantity: number = 0
  description: string = ""
  picture: string = ""
  creation_date: Date = new Date()
  isPopular: boolean = false
  category: Category = new Category()
  status: boolean = true
  sold_quantity: number = 0
}