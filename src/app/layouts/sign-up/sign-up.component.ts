import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  public icons = icons
  public isLoading: boolean = false
  public isTrigger: boolean = false
  public checkTermsAndServices: boolean = false
  public checkPrivacyPolicy: boolean = false
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
    private messageService: NzMessageService,
    private accountService: AccountService
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
    this.accountService.register({
      accountName: this.account.name,
      accountPhone: "+84" + this.account.phone.substring(1),
      accountPassword: this.account.password,
      accountEmail: this.account.email,
      accountAddress: "",
      accountRole: 2,
      accountActive: true
    }).pipe(
        finalize(() => {
          this.isLoading = false
        })
    ).subscribe({
      next: (res) => {
        this.isLoading = false
        if(res.status){
          this.messageService.success("Đăng ký thành công, Xin vui lòng đăng nhập vào tài khoản vừa tạo")
          this.router.navigateByUrl('/sign-in')
        }else{
          this.messageService.error(res.message)
        }
      },
      error: (err) => {
        this.isLoading = false
        this.messageService.error(err.error.message)
      }
    })
  }
}
