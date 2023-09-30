export class Account {
  id: string = ""
  name: string = ""
  phone: string = ""
  email: string = ""
  password: string = ""
  address: string = ""
  role: "1" | "0" = "1"
  status: boolean = true
  created_date: Date = new Date()
}