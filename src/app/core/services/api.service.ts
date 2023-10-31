import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError, timeout } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private base_nodejs_url = environment.BASE_NODEJS_URL
  private base_spring_boot_url = environment.BASE_SPRING_URL
  private vietnam_url = environment.BASE_VIETNAM_URL
  // private base_spring_boot_url = "http://localhost:8080"
  private service_nodejs = {
    IMAGE: '/image',
    BANNER: '/banner'
  }
  private service_spring_boot = {
    ACCOUNT: '/accounts',
    DISCOUNT: '/discounts',
    CATEGORY: '/categories',
    PRODUCT: '/products',
    PRODUCT_SIZE: '/product_sizes'
  }

  private service_vietnam = this.vietnam_url

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

  discountService(): String {
    return this.base_spring_boot_url + this.service_spring_boot.DISCOUNT
  }

  categoryService(): String {
    return this.base_spring_boot_url + this.service_spring_boot.CATEGORY
  }

  productService(): String {
    return this.base_spring_boot_url + this.service_spring_boot.PRODUCT
  }

  productSizeService(): String {
    return this.base_spring_boot_url + this.service_spring_boot.PRODUCT_SIZE
  }

  vietnamService(): String {
    return this.service_vietnam
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
        if(res.status === true){
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
      timeout(300000),
      catchError((err: HttpErrorResponse) => throwError(() => err))
    )
  }
}
