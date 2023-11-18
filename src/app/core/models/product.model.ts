import { ProductSizeData } from "src/app/data/data"
import { Category } from "./category.model"

export class Product{
  id: string = ""
  name: string = ""
  description: string = ""
  imageUrl: string = ""
  creationDate: number = new Date().getTime()
  isPopular: boolean = false
  category: Category = new Category()
  active: boolean = false
  minPrice?: number
}