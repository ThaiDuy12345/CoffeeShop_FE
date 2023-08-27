import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountData } from 'src/app/data/data';
import Cookies from 'js-cookie'
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
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

  ngOnInit(): void {
    Cookies.get('id') && this.router.navigate(['/main/dashboard'])
  }

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
    Cookies.set('id', result.id, { expires: 0.02083 })
    
    
    this.message.success(`Đăng nhập thành công, Chào bạn ${result.name}`)
    setTimeout(() => this.router.navigate(["/main/dashboard"]), 2000)
  }
}
