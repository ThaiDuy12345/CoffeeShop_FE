import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { NzMessageService } from 'ng-zorro-antd/message';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public icons = icons
  public isLoading: boolean = false
  public isTrigger: boolean = false
  public account: {
    email: string,
    password: string,
    name: string,
    phone: string
  } = {
    email: '',
    password: '',
    name: '',
    phone: ''
  }

  ngOnInit(): void {
    Cookies.get('id') && this.router.navigate(['/main/dashboard'])
  }

  constructor(
    private router: Router,
    private messageService: NzMessageService
  ){}

  isEmailValidate(): Boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.account.email)
  }

  isPasswordValidate(): Boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(this.account.password)
  }

  onClickSignUp(): void {
    this.isTrigger = true

    if(
      this.account.name.length === 0 ||
      this.account.phone.length === 0 ||
      this.isEmailValidate() === false ||
      this.isPasswordValidate() === false
    ) return
    
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.messageService.success("Đăng ký thành công, Xin vui lòng đăng nhập vào tài khoản vừa tạo")
      this.router.navigateByUrl('/sign-in')
    }, 3000)
  }
}
