import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  forgotPasswordFirstStep(params: { accountEmail: String }): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.forgotPasswordService().toString() + `/${params.accountEmail}`, {})
    )
  }
}