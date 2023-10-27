import { ProductSizeData } from "src/app/data/data"
import { Category } from "./category.model"

export class Product{
  id: string = ""
  name: string = ""
  description: string = ""
  imageUrl: string = ""
  creationDate: number = 0
  isPopular: boolean = false
  category: Category = new Category()
  active: boolean = true
}