import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private base_nodejs_url = "https://coffeeshop-service.onrender.com/api"
  private base_spring_boot_url = "https://coffee-shop-spring.azurewebsites.net"
  // private base_spring_boot_url = "http://localhost:8080"
  private service_nodejs = {
    IMAGE: '/image',
    BANNER: '/banner'
  }
  private service_spring_boot = {
    ACCOUNT: '/accounts',
    DISCOUNT: '/discounts'
  }

  constructor(
    private http: HttpClient
  ){}

  imageService(): String {
    return this.base_nodejs_url + this.service_nodejs.IMAGE
  }

  bannerService(): String {
    return this.base_nodejs_url + this.service_nodejs.BANNER
  }

  accountService(): String {
    return this.base_spring_boot_url + this.service_spring_boot.ACCOUNT
  }

  isAlive(): Observable<Boolean>{
    return new Observable((observer) => {
      this.isNodeJSAlive().subscribe(res => {
        if(!res){
          observer.next(res)
          observer.complete()
        }else{
          this.isSpringBootAlive().subscribe(res => {
            observer.next(res)
            observer.complete()
          })
        }
      })
    })
  }

  isNodeJSAlive(): Observable<boolean>{
    return new Observable((observer) => this.http.get(this.base_nodejs_url).subscribe({
      next: (res: any) => {
        if(res.status === 200){
          observer.next(true)
          observer.complete()
        }else {
          observer.next(false)
          observer.complete()
        }
      },
      error: (err: any) => {
        console.log(err)
        observer.next(false)
        observer.complete()
      }
    }))  
  }

  isSpringBootAlive(): Observable<boolean>{
    return new Observable((observer) => this.http.get(this.base_spring_boot_url).subscribe({
      next: (res: any) => {
        if(res.status === 200){
          observer.next(true)
          observer.complete()
        }else {
          observer.next(false)
          observer.complete()
        }
      },
      error: (err: any) => {
        console.log(err)
        observer.next(false)
        observer.complete()
      }
    }))
  }

  errorHandle(observable: Observable<any>): Observable<any>{
    return observable.pipe(
      catchError((err: HttpErrorResponse) => throwError(() => err))
    )
  }
}
