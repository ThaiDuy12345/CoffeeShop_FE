import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BannerService{
  private mainBannerId: string = "65243a5c03b0401f307211a0"
  private popupBannerId: string = "65243cdd7b2bd52ca2bb1037"
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ){}
  
  getMainBanner(): Observable<any> {
    return this.http.get(
      this.apiService.bannerService() + `/${this.mainBannerId}`
    ).pipe(
      catchError((err: HttpErrorResponse) =>{ 
        return throwError(() => err)
      })
    )
  }

  getPopupBanner(): Observable<any> {
    return this.http.get(
      this.apiService.bannerService() + `/${this.popupBannerId}`
    ).pipe(
      catchError((err: HttpErrorResponse) =>{ 
        return throwError(() => err)
      })
    )
  }

}