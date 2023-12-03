import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, finalize, forkJoin, takeWhile } from 'rxjs';
import { AuthenticationStore } from '../core/stores/authentication.store';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private authenticationStore: AuthenticationStore,
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
        if(state.account.phone && state.account.role === 0) observer.next(true)
        else if(state.account.phone && state.account.role !== 0) {
          observer.next(false)
          this.router.navigateByUrl('/main/dashboard')
        }else{
          this.authService.isAdmin()
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
