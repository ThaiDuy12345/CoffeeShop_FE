import { Injectable } from "@angular/core";
import Cookies from "js-cookie";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { AccountService } from "./account.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private accountService: AccountService,
    private httpClient: HttpClient,
    private messageService: NzMessageService,
    private router: Router
  ){}
  
  isSignedIn(): Observable<any> {
    return new Observable(observer => {
      const id = Cookies.get('id')
      if(!id) {
        this.messageService.error('Tài khoản đã hết hạn, xin vui lòng đăng nhập lại')
        this.router.navigateByUrl('/sign-in')
        observer.next(false)
        observer.complete()
        return
      }
      this.accountService.getByPhone({ accountPhone: id }).subscribe({
        next: (res) => {
          observer.next(res.status)
          observer.complete()
        },
        error: (err) => {
          console.log(err)
          this.messageService.error('Xác thực tài khoản thất bại, vui lòng đăng nhập lại')
          this.router.navigateByUrl('/sign-in')
          Cookies.remove('id')
          observer.next(false)
          observer.complete()
        }
      })
    })
  }

  isAdmin(): Observable<any> {
    return new Observable(observer => {
      const id = Cookies.get('id')
      if(!id) {
        this.messageService.error('Tài khoản đã hết hạn, xin vui lòng đăng nhập lại')
        this.router.navigateByUrl('/sign-in')
        observer.next(false)
        observer.complete()
        return
      }
      this.accountService.getByPhone({ accountPhone: id }).subscribe({
        next: (res) => {
          observer.next(res.status && res.data.accountRole === 0)
          observer.complete()
        },
        error: (err) => {
          console.log(err)
          this.messageService.error('Xác thực tài khoản thất bại, vui lòng đăng nhập lại')
          this.router.navigateByUrl('/sign-in')
          Cookies.remove('id')
          observer.next(false)
          observer.complete()
        }
      })
    })
  }
  
  isStaff(): Observable<Boolean> {
    return new Observable(observer => {
      const id = Cookies.get('id')
      if(!id) {
        this.messageService.error('Tài khoản đã hết hạn, xin vui lòng đăng nhập lại')
        this.router.navigateByUrl('/sign-in')
        observer.next(false)
        observer.complete()
        return
      }
      this.accountService.getByPhone({ accountPhone: id }).subscribe({
        next: (res) => {
          observer.next(res.status && (res.data.accountRole === 0 || res.data.accountRole === 1))
          observer.complete()
        },
        error: (err) => {
          console.log(err)
          this.messageService.error('Xác thực tài khoản thất bại, vui lòng đăng nhập lại')
          this.router.navigateByUrl('/sign-in')
          Cookies.remove('id')
          observer.next(false)
          observer.complete()
        }
      })
    })
  }

  signIn(params: { accountEmail: string, accountPassword: string }): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.accountService().toString() + "/login", params)
    )
  }

  signUp(params: { 
    accountEmail: string, 
    accountPassword: string,
    accountPhone: string,
    accountName: string
  }): Observable<any> {
    return this.apiService.errorHandle(
      this.httpClient.post(this.apiService.accountService().toString() + "/register", params)
    )
  }
}