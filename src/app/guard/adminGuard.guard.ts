import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard {

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
    if(this.authService.isSignedIn() && this.authService.isAdmin()) return true
    this.router.navigate(["/sign-in"])
    return false
  }
}
