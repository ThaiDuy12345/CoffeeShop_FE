import { ProductSizeData } from "src/app/data/data"
import { Category } from "./category.model"

export class Product{
  id: string = ""
  name: string = ""
  description: string = ""
  imageUrl: string = ""
  creationDate: Date = new Date()
  isPopular: boolean = false
  category?: Category = undefined
  active: boolean = true
}