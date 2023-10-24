import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getAll(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.categoryService().toString())
    )
  }

  post(params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.categoryService().toString(), params)
    )
  }

  put(categoryId: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.categoryService().toString() + `/${categoryId}`, params)
    )
  }

  getById(params: { categoryId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.categoryService().toString() + `/${params.categoryId}`)
    )
  }

  delete(params: { categoryId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.delete(this.apiService.categoryService().toString() + `/${params.categoryId}`)
    )
  }

  
}