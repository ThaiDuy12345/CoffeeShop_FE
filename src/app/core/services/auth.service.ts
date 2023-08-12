import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isSignedIn(): Boolean {
    return true
  }
}