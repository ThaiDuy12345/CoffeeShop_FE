import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderingService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getAll(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.orderingService().toString())
    )
  }

  post(params: { accountPhone: string, payload: any }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.orderingService().toString() + `/${params.accountPhone}`, params.payload)
    )
  }

  put(params: { orderingId: string, payload: any }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.orderingService().toString() + `/${params.orderingId}`, params.payload)
    )
  }

  getById(params: { orderingId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.orderingService().toString() + `/${params.orderingId}`)
    )
  }
}