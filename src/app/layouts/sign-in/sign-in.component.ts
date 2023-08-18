import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AccountData } from 'src/app/data/data';
import Cookies from 'js-cookie'
import { NzMessageService } from 'ng-zorro-antd/message';
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
  public showPassword: boolean = false
  
  public isSubmitted: boolean = false
  public isLoading: boolean = false
  constructor(
    private router: Router,
    private message: NzMessageService
  ){}

  onClickSignIn(): void {
    if(!this.account.email || !this.account.password){
      this.message.warning('Email và mật khẩu không được để trống.')
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
      this.message.error('Email hoặc mật khẩu không chính xác.')
      this.isLoading = false
      return
    }
    Cookies.set('id', result.id)
    
    
    this.message.success(`Đăng nhập thành công, Chào bạn ${result.name}`)
    this.router.navigate(["/main/dashboard"])
  }
}
