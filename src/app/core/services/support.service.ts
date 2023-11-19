import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getAll(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.supportService().toString())
    )
  }
  
  getById(params: { supportId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.supportService().toString() + `/${params.supportId}`)
    )
  }

  post(payload: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.supportService().toString(), payload)
    )
  }

  put(params: { supportId: string, payload: any }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.supportService().toString() + `/${params.supportId}`, params.payload)
    )
  }

  delete(params: { supportId: string }): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.delete(this.apiService.supportService().toString() + `/${params.supportId}`)
    )
  }
}