import { Router } from '@angular/router';
import { AlertService } from './../../core/services/alert.service';
import { Component } from '@angular/core';
import { AccountData } from 'src/app/data/data';
import Cookies from 'js-cookie'
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public account: { email: string, password: string } = {
    email: '',
    password: ''
  }
  
  public isSubmitted: Boolean = false
  public isLoading: Boolean = false
  constructor(
    private alertService: AlertService,
    private router: Router
  ){}

  onClickSignIn(): void {
    if(!this.account.email || !this.account.password){
      this.alertService.error('Error', 'Email and password are required.' )
      return
    }
    this.isLoading = true
    this.isSubmitted = true

    const result = AccountData.find(item => {
      return (
        item.email === this.account.email
        &&
        item.password === this.account.password
      )
    })
    if(!result){
      this.alertService.error('Error', 'Incorrect email or password.' )
      this.isLoading = false
      return
    }
    this.alertService.success('Success', `Successfully signed in, welcome ${result.name}` )
    Cookies.set('id', result.id)

    setTimeout(() => {
      this.router.navigate(["/main/dashboard"])
    }, 1000)
  }
}
