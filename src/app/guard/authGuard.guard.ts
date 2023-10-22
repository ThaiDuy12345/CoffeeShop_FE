import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, finalize, forkJoin, takeWhile } from 'rxjs';
import { AuthenticationStore } from '../core/stores/authentication.store';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private authenticationStore: AuthenticationStore,
    private messageService: NzMessageService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): 
    Observable<Boolean> | 
    Promise<Boolean> | 
    Boolean 
  {
    return new Observable<Boolean>(observer => {
      this.authenticationStore._select(state => state).pipe(
        finalize(() => {
          observer.complete()
        })
      ).subscribe(state => {
        if(state.account.phone) observer.next(true)
        else{
          this.authService.isSignedIn()
          .subscribe({
            next: (result) => {
              if(result.status === true){
                observer.next(true)
              }else{
                observer.next(false)
                this.router.navigateByUrl('/sign-in')
              }
            },
            error: err => {
              observer.next(false)
              this.messageService.error("Bạn cần đăng nhập để tiếp tục")
              this.router.navigateByUrl('/sign-in')
            }
          })
        }
      })
    })
  }
}
