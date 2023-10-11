import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private base_url = "https://coffeeshop-service.onrender.com/api"
  // private base_url = "http://localhost:5050/api"
  private service = {
    IMAGE: '/image',
    BANNER: '/banner'
  }

  constructor(
    private http: HttpClient
  ){}
  

  imageService(): String {
    return this.base_url + this.service.IMAGE
  }

  bannerService(): String {
    return this.base_url + this.service.BANNER
  }

  isAlive(): Observable<any>{
    return this.http.get(this.base_url)
      .pipe(catchError((err) => throwError(() => err)))
  }
}