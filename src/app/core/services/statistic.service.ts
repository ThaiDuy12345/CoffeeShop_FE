import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticService{
  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient
  ) {}


  get(): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.statisticService().toString())
    )
  }

  getByProductSoldQuantity(): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.statisticService().toString() + "/productBySoldQuantity")
    )
  }

  getByProductFeedbackQuantity(): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.statisticService().toString() + "/productByFeedbackQuantity")
    )
  }

  getStatisticChart(params: { 
    type: "product" | "ordering" | "support" | "feedback"
    dateType: "week" | "month" | "halfYear" | "year" 
  }): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.statisticService().toString() + `/statisticChart?type=${params.type}&dateType=${params.dateType}`)
    )
  }
}