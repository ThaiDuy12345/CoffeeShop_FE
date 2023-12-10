import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService{
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ){}
  
  addNewImage(image: { productId: string, formData: FormData }): Observable<any> {
    return this.apiService.errorHandle(this.http.post(
      this.apiService.imageService().toString() + `/${image.productId}`,
      image.formData
    ))
  }

  getById(image: { imageId: string }): Observable<any> {
    return this.apiService.errorHandle(this.http.get(
      this.apiService.imageService().toString() + `/${image.imageId}`,
    ))
  }
}