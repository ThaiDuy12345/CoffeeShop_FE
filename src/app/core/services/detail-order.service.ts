import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailOrderService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getByOrderId(params: { orderingId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.detailOrderService().toString() + `/ordering/${params.orderingId}`)
    )
  }

  post(payload: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.detailOrderService().toString(), payload)
    )
  }

  put(payload: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.detailOrderService().toString(), payload)
    )
  }

  delete(payload: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.detailOrderService().toString() + "/delete", payload)
    )
  }
}