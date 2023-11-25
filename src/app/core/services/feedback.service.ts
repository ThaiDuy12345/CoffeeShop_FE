import { HttpClient } from "@angular/common/http"
import { ApiService } from "./api.service"
import { Observable } from "rxjs"

export class FeedbackService{
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getAll(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.feedbackService().toString())
    )
  }
  
  getByAccountPhone(params: { accountPhone: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.feedbackService().toString() + `/account/${params.accountPhone}`)
    )
  }

  getByProductId(params: { productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.feedbackService().toString() + `/product/${params.productId}`)
    )
  }

  getByAccountPhoneAndProductId(params: { accountPhone: string, productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.feedbackService().toString() + `/productAndAccount/${params.productId}/${params.accountPhone}`)
    )
  }

  getIsAllowedToCreateFeedback(params: { accountPhone: string, productId: string }): Observable<boolean> {
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.feedbackService().toString() + `/isAllowedToCreateFeedback/${params.productId}/${params.accountPhone}`)
    )
  }
  
  post(payload: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.feedbackService().toString(), payload)
    )
  }

  put(params: { supportId: string, payload: any }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.feedbackService().toString() + `/${params.supportId}`, params.payload)
    )
  }

  delete(params: { supportId: string }): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.delete(this.apiService.feedbackService().toString() + `/${params.supportId}`)
    )
  }
}