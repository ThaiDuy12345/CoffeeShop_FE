import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getAll(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.discountService().toString())
    )
  }

  post(params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.discountService().toString(), params)
    )
  }

  put(discountId: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.discountService().toString() + `/${discountId}`, params)
    )
  }

  getById(params: { discountId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.discountService().toString() + `/${params.discountId}`)
    )
  }

  getByCode(params: { discountCode: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.discountService().toString() + `/code/${params.discountCode}`)
    )
  }
  
}