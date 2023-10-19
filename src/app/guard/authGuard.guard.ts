import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, takeWhile } from 'rxjs';
import { AuthenticationStore } from '../core/stores/authentication.store';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private authenticationStore: AuthenticationStore
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
        if(state.account.phone) observer.next(true)
        else{
          this.authService.isSignedIn()
          .subscribe({
            next: (result) => {
              observer.next(result)
              observer.complete()
            },
            error: err => {
              observer.next(false)
              observer.complete()
            }
          })
        }
      })
    })
  }
}
