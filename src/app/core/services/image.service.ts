import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService{
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ){}
  
  addNewImage(formData: FormData): Observable<any> {
    return this.http.post(
      this.apiService.imageService().toString(),
      formData
    ).pipe(
      catchError((err: HttpErrorResponse) => throwError(() => err))
    )
  }

}