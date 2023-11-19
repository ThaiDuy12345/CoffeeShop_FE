import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private apiService: ApiService, 
    private httpClient: HttpClient
  ){}

  getAll(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.productService().toString())
    )
  }

  getById(params: { productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.productService().toString() + `/${params.productId}`)
    )
  }

  getSoldQuantityById(params: { productId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.productService().toString() + `/soldQuantity/${params.productId}`)
    )
  }

  getAllWithPrice(): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.productService().toString() + `/withPrice`)
    )
  }
  
  getByCategory(params: { categoryId: string }): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.get(this.apiService.productService().toString() + `/category/${params.categoryId}`)
    )
  }

  post(params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.productService().toString(), params)
    )
  }

  put(productId: string, params: any): Observable<any>{
    return this.apiService.errorHandle(
      this.httpClient.put(this.apiService.productService().toString() + `/${productId}`, params)
    )
  }

  filterActiveProducts(products: Product[]): Product[]{
    return products.filter(p => p.active)
  }
  
}