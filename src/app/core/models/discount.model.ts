import { Ordering } from "./ordering.model"

export class Discount {
  id: string = ""
  code: string = ""
  creationDate: number = new Date().getTime()
  expiredDate: number = new Date().getTime()
  minimumOrderingPrice: number = 0
  amount: number = 0
  orderings: any[] = []
}