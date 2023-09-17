import { Category } from "./category.model"

export class Product{
  id: string = ""
  name: string = ""
  price: number = 0
  quantity: number = 0
  description: string = ""
  picture: string = ""
  creation_date: Date = new Date()
  category: Category = new Category()
}