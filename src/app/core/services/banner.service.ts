import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BannerService{
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ){}
  
  getMainBanner(): Observable<any> {
    return this.http.get(
      this.apiService.bannerService() + `/main`
    ).pipe(
      catchError((err: HttpErrorResponse) =>{ 
        return throwError(() => err)
      })
    )
  }

  updateBanner(params: { type: "main" | "pop_up", formData: FormData }): Observable<any> {
    return this.http.post(
      this.apiService.bannerService() + `/${params.type}`,
      params.formData
    ).pipe(
      catchError((err: HttpErrorResponse) =>{ 
        return throwError(() => err)
      })
    )
  }

  getPopupBanner(): Observable<any> {
    return this.http.get(
      this.apiService.bannerService() + `/pop_up`
    ).pipe(
      catchError((err: HttpErrorResponse) =>{ 
        return throwError(() => err)
      })
    )
  }

  resetBanner(params: { type: "main" | "pop_up" }): Observable<any> {
    return this.http.delete(
      this.apiService.bannerService() + `/${params.type}`
    ).pipe(
      catchError((err: HttpErrorResponse) =>{ 
        return throwError(() => err)
      })
    )
  }
}