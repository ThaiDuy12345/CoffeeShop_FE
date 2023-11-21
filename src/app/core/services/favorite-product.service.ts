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

  post(params: { accountPhone: string, productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.favoriteProductService().toString() + `/${params.productId}/${params.accountPhone}`, {})
    )
  }

  delete(params: { accountPhone: string, productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.delete(this.apiService.favoriteProductService().toString() + `/${params.productId}/${params.accountPhone}`)
    )
  }

  isFavoriteByProductIdAndAccountPhone(params: { accountPhone: string, productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.favoriteProductService().toString() + `/isFavorite/${params.productId}/${params.accountPhone}`)
    )
  }

  getAllByAccountPhone(params: { accountPhone: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.favoriteProductService().toString() + `/account/${params.accountPhone}`)
    )
  }
}