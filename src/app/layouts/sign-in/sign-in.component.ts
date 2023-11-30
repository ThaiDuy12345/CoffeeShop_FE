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
import { Subject } from 'rxjs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
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
  public tempSubject: Subject<any> = new Subject()
  public user: SocialUser = new SocialUser();
  public loggedIn: boolean = true;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private authService: SocialAuthService,
    private authenService: AuthService,
    private accountService: AccountService,
    @Optional() public dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
  ){}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.tempSubject.subscribe({
      next: (user) => {
        this.user = user;
        this.user && this.signInByEmail(user.email)
      }, 
      error: (err) => {
        console.log(err)
      }
    })
    
    this.authService.authState.subscribe(this.tempSubject);

    Cookies.get('id') && this.router.navigate(['/main/dashboard'])
  }
  
  signinWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID) 
    this.authService.signOut()
  }

  onClickSignIn(): void {
    this.isSubmitted = true
    if(!this.account.email || !this.account.password){
      return
    }
    this.isLoading = true
    this.signIn()
  }

  openForgotPassword(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  handleCloseForgotPasswordModal(): void {
    this.dialogRef.close()
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
      accountEmail: email,
    }).subscribe({
      next: (res) => {
        if(res.status === false || res.data.accountActive === false){
          this.message.error(res.message)
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
}
