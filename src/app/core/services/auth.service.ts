import { Injectable } from "@angular/core";
import Cookies from "js-cookie";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { AccountService } from "./account.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { Router } from "@angular/router";
import { AuthenticationStore } from "../stores/authentication.store";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private accountService: AccountService,
    private httpClient: HttpClient,
    private authenticationStore: AuthenticationStore,
    private messageService: NzMessageService
  ){}
  
  isSignedIn(): Observable<any> {
    return new Observable(observer => {
      const id = Cookies.get('id')
      if(!id) {
        this.messageService.error("Bạn cần đăng nhập để tiếp tục")
        observer.next({ status: false, link: "/sign-in" })
        observer.complete()
        return
      }
      this.accountService.getByPhone({ accountPhone: id }).subscribe({
        next: (res) => {
          if(!res.status){
            Cookies.remove('id')
            this.messageService.error("Bạn cần đăng nhập để tiếp tục")
            observer.next({ status: false, link: "/sign-in" })
          }else{
            this.saveAccountToStore(res.data)
            observer.next({ status: true, link: "" })
          }
          observer.complete()
        },
        error: (err) => {
          Cookies.remove('id')
          this.messageService.error("Bạn cần đăng nhập để tiếp tục")
          observer.next({ status: false, link: "/sign-in" })
          observer.complete()
        }
      })
    })
  }

  isAdmin(): Observable<any> {
    return new Observable(observer => {
      const id = Cookies.get('id')
      if(!id) {
        this.messageService.error("Bạn cần đăng nhập để tiếp tục")
        observer.next({ status: false, link: "/sign-in" })
        observer.complete()
        return
      }
      this.accountService.getByPhone({ accountPhone: id }).subscribe({
        next: (res) => {
          if(!res.status){
            Cookies.remove('id')
            this.messageService.error("Bạn cần đăng nhập để tiếp tục")
            observer.next({ status: false, link: "/sign-in" })
          }else{
            if(res.data.accountRole === 0){
              this.saveAccountToStore(res.data)
              observer.next({ status: true, link: "" })
            }else{
              observer.next({ status: false, link: "/main/dashboard" })
            }
          }
          observer.complete()
        },
        error: (err) => {
          Cookies.remove('id')
          this.messageService.error("Bạn cần đăng nhập để tiếp tục")
          observer.next({ status: false, link: "/sign-in" })
          observer.complete()
        }
      })
      
    })
  }
  
  isStaff(): Observable<any> {
    return new Observable(observer => {
      const id = Cookies.get('id')
      if(!id) {
        this.messageService.error("Bạn cần đăng nhập để tiếp tục")
        observer.next({ status: false, link: "/sign-in" })
        observer.complete()
        return
      }
      this.accountService.getByPhone({ accountPhone: id }).subscribe({
        next: (res) => {
          if(!res.status){
            Cookies.remove('id')
            this.messageService.error("Bạn cần đăng nhập để tiếp tục")
            observer.next({ status: false, link: "/sign-in" })
          }else{
            if(res.data.accountRole === 0 || res.data.accountRole === 1){
              this.saveAccountToStore(res.data)
              observer.next({ status: true, link: "" })
            }else{
              observer.next({ status: false, link: "/main/dashboard" })
            }
          }
          observer.complete()
        },
        error: (err) => {
          Cookies.remove('id')
          this.messageService.error("Bạn cần đăng nhập để tiếp tục")
          observer.next({ status: false, link: "/sign-in" })
          observer.complete()
        }
      })
    })
  }

  saveAccountToStore(data: any): void {
    this.authenticationStore.update(state => {
      return {
        account: {
          name: data.accountName,
          phone: data.accountPhone,
          email: data.accountEmail,
          password: data.accountPassword,
          active: data.accountActive,
          role: data.accountRole,
          address: data.accountAddress
        }
      }
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