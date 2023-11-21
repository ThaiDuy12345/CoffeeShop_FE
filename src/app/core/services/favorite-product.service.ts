import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class favoriteProductService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  post(productId: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.favoriteProductService().toString() + `/product/${productId}`, params)
    )
  }

  put(favoriteProductId: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.favoriteProductService().toString() + `/${favoriteProductId}`, params)
    )
  }

  delete(params: { favoriteProductId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.delete(this.apiService.favoriteProductService().toString() + `/${params.favoriteProductId}`)
    )
  }

  getByProductId(params: { productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.favoriteProductService().toString() + `/product/${params.productId}`)
    )
  }
}