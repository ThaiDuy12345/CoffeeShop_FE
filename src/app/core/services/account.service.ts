import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Account } from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getAll(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.accountService().toString())
    )
  }

  register(params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.accountService().toString() + `/register`, params)
    )
  }

  put(phone: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.accountService().toString() + `/${phone}`, params)
    )
  }

  getByPhone(params: { accountPhone: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.accountService().toString() + `/${params.accountPhone}`)
    )
  }
  
}