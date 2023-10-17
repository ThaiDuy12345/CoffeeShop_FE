import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, takeWhile } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
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
    })
  }
}
