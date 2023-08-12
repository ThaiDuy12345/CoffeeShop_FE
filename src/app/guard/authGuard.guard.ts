import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private authService: AuthService 
  ){}

  canActivate(): 
    Observable<Boolean> | 
    Promise<Boolean> | 
    Boolean 
  {
    return this.authService.isSignedIn()
  }
}
