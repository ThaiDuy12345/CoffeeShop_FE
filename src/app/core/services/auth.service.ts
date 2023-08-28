import { Injectable } from "@angular/core";
import Cookies from "js-cookie";
import { AccountData } from "../../data/data"
@Injectable({
  providedIn: "root"
})
export class AuthService {
  isSignedIn(): Boolean {
    const id = Cookies.get('id')
    if(!id) return false 
    const result = AccountData.find(item => item.id === id)
    return result ? true : false
  }
}