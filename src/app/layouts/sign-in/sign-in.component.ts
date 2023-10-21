import { Router } from '@angular/router';
import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { AccountData } from 'src/app/data/data';
import Cookies from 'js-cookie'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FacebookLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { icons } from 'src/app/shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AccountService } from 'src/app/core/services/account.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public icons: Icon = icons
  public account: { email: string, password: string } = {
    email: '',
    password: ''
  }
  public showPassword: boolean = false
  public isSubmitted: boolean = false
  public isLoading: boolean = false
  public forgotPasswordEmailInput: string = ''
  public isLoadingForgotPassword: boolean = false 
  public forgotPasswordStep: 1 | 2 | 3 = 1
  public forgotPasswordCode: string = ''
  public newPassword: string = ''
  public newConfirmPassword: string = ''

  public user: SocialUser = new SocialUser();
  public loggedIn: boolean = true;

  constructor(
    private router: Router,
    private message: NzMessageService,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
    private authService: SocialAuthService,
    private authenService: AuthService,
    private accountService: AccountService
  ){}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signInByEmail(user.email)
    });

    Cookies.get('id') && this.router.navigate(['/main/dashboard'])
  }
  
  signinWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID) 
    this.authService.signOut()
  }

  onClickSignIn(): void {
    if(!this.account.email || !this.account.password){
      this.message.warning('Email và mật khẩu không được để trống.')
      return
    }
    this.isLoading = true
    this.isSubmitted = true
    this.signIn()
    
  }

  signIn(): void {
    this.authenService.signIn({
      accountEmail: this.account.email,
      accountPassword: this.account.password
    }).subscribe({
      next: (res) => {
        if(res.status === false || res.data.accountActive === false){
          this.message.error('Email hoặc mật khẩu không chính xác.')
          this.isLoading = false
          return
        }
        
        this.authenService.saveAccountToStore(res.data)

        //Hết hạn trong vòng 30 phút
        Cookies.set('id', res.data.accountPhone, { 
          expires: new Date(new Date().getTime() + 30 * 60 * 1000 ) 
        })
        
        this.message.success(`Đăng nhập thành công, Chào bạn ${res.data.accountName}`)
        this.router.navigate(["/main/dashboard"])
      },
      error: (err: any) => {
        this.message.error(err.error.message)
        this.isLoading = false
        console.log(err)
      }
    })
  }

  signInByEmail(email: string): void {
    if(!email) return

    this.accountService.getByEmail({
      accountEmail: this.account.email,
    }).subscribe({
      next: (res) => {
        if(res.status === false || res.data.accountActive === false){
          this.message.error('Email hoặc mật khẩu không chính xác.')
          this.isLoading = false
          return
        }
        
        this.authenService.saveAccountToStore(res.data)

        //Hết hạn trong vòng 30 phút
        Cookies.set('id', res.data.accountPhone, { 
          expires: new Date(new Date().getTime() + 30 * 60 * 1000 ) 
        })
        
        this.message.success(`Đăng nhập thành công, Chào bạn ${res.data.accountName}`)
        this.router.navigate(["/main/dashboard"])
      },
      error: (err: any) => {
        this.message.error(err.error.message)
        this.isLoading = false
        console.log(err)
      }
    })
  }

  openForgotPassword(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  closeForgotPassword(): void {
    this.isLoadingForgotPassword = false
    this.dialogRef.close()
  }

  onClickSubmitForgotPassword(): void {
    this.isLoadingForgotPassword = true
    
    setTimeout(() => {
      const result = AccountData.find(item => {
        return (
          item.email === this.forgotPasswordEmailInput
        )
      })
      if(result){
        this.forgotPasswordStep = 2
      }else {
        this.message.error('Địa chỉ Email không tồn tại.')
      }
      this.isLoadingForgotPassword = false
      
    }, 2000)
  }

  onClickSubmitForgotPasswordValidate(): void {
    this.isLoadingForgotPassword = true

    setTimeout(() => {
      this.isLoadingForgotPassword = false
      this.forgotPasswordStep = 3
    }, 2000)
  }

  isPasswordValidate(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
  }

  onClickSubmitNewForgotPassword(): void {
    this.isLoadingForgotPassword = true

    setTimeout(() => {
      this.isLoadingForgotPassword = false
      this.forgotPasswordStep = 1
      this.forgotPasswordEmailInput = ''
      this.forgotPasswordCode = ''
      this.newPassword = ''
      this.newConfirmPassword = ''
      this.dialogRef.close()
      this.message.success('Cập nhật mật khẩu mới thành công, xin vui lòng đăng nhập lại.')
    }, 2000)
  }
}
