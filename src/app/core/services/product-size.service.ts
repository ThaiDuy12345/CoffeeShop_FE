import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductSizeService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  post(productId: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.productSizeService().toString() + `/product/${productId}`, params)
    )
  }

  put(productSizeId: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.productSizeService().toString() + `/${productSizeId}`, params)
    )
  }

  delete(params: { productSizeId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.delete(this.apiService.productSizeService().toString() + `/${params.productSizeId}`)
    )
  }

  getByProductId(params: { productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.productSizeService().toString() + `/product/${params.productId}`)
    )
  }
}