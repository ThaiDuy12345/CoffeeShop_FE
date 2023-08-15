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
  
  public isSubmitted: boolean = false
  public isLoading: boolean = false
  constructor(
    private alertService: AlertService,
    private router: Router
  ){}

  onClickSignIn(): void {
    if(!this.account.email || !this.account.password){
      this.alertService.warn('Cảnh báo', 'Email và mật khẩu không được để trống.' )
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
      this.alertService.error('Lỗi', 'Email hoặc mật khẩu không chính xác.' )
      this.isLoading = false
      return
    }
    this.alertService.success('Thành công', `Đăng nhập thành công, Chào bạn ${result.name}` )
    Cookies.set('id', result.id)

    setTimeout(() => {
      this.router.navigate(["/main/dashboard"])
    }, 2000)
  }
}
