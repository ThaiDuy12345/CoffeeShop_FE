import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, takeWhile } from 'rxjs';
import { AuthenticationStore } from '../core/stores/authentication.store';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root',
})
export class StaffGuard {
  
  constructor(
    private authService: AuthService,
    private authenticationStore: AuthenticationStore,
    private router: Router,
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
      this.authenticationStore._select(state => state).subscribe(state => {
        if(state.account.phone && (state.account.role === 1 || state.account.role === 0)) observer.next(true)
        else if(state.account.phone && !(state.account.role === 1 || state.account.role === 0)) {
          observer.next(false)
          this.router.navigateByUrl('/main/dashboard')
        }else{
          this.authService.isStaff()
          .subscribe({
            next: (result) => {
              if(result.status === true){
                observer.next(true)
              }else{
                observer.next(false)
                this.router.navigateByUrl(result.link)
              }
            },
            error: err => {
              observer.next(false)
              this.router.navigateByUrl('/main/dashboard')
            }
          })
        }
      })
    })
  }
}
