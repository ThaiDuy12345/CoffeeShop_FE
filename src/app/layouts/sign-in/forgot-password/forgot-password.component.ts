import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ForgotPasswordService } from 'src/app/core/services/forgot-password.service';
import { finalize } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { Account } from 'src/app/core/models/account.model';
import { MappingService } from 'src/app/core/services/mapping.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public forgotPasswordEmailInput: string = ''
  public isLoadingForgotPassword: boolean = false 
  public forgotPasswordStep: 1 | 2 | 3 = 1
  public forgotPasswordCode: string = ''
  public newPassword: string = ''
  public newConfirmPassword: string = ''
  public step2Code: string = ''
  public step2CodeRetry: number = 5
  public account: Account = new Account()
  @Output() public onClickCloseForgotPasswordModal: EventEmitter<any> = new EventEmitter()
  
  constructor(
    private messageService: NzMessageService,
    private forgotPasswordService: ForgotPasswordService,
    private accountService: AccountService,
    private mappingService: MappingService
  ){}

  closeForgotPassword(): void {
    this.renewForm()
    this.onClickCloseForgotPasswordModal.emit()
  } 

  onClickSubmitForgotPassword(): void {
    if(!this.forgotPasswordEmailInput){
      this.messageService.error("Xin vui lòng điền email để tiếp tục")
      return
    }

    if((/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.forgotPasswordEmailInput)) === false){
      this.messageService.error("Email không hợp lệ")
      return
    }
  
    this.isLoadingForgotPassword = true
    this.forgotPasswordService.forgotPasswordFirstStep({ accountEmail: this.forgotPasswordEmailInput }).pipe(
      finalize(() => this.isLoadingForgotPassword = false)
    ).subscribe({
      next: res => {
        if(!res.status) {
          this.messageService.error(res.message)
          return
        }

        this.accountService.getByEmail({ accountEmail: this.forgotPasswordEmailInput }).subscribe({
          next: res => {
            if(!res.status) {
              this.messageService.error(res.message)
              return
            }
            this.account = this.mappingService.account(res.data) 
          },
          error: err => this.messageService.error(err.error.message)
        })

        this.forgotPasswordStep = 2
        this.step2Code = atob(res.data)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  onClickSubmitForgotPasswordValidate(): void {
    if(this.forgotPasswordCode !== this.step2Code){
      this.step2CodeRetry--
      switch(true){
        case (this.step2CodeRetry > 0 && this.step2CodeRetry <= 3): {
          this.messageService.error(`Mã code bạn đã nhập không đúng!! Bạn còn ${this.step2CodeRetry} lần thử!!`)
          return
        }
        case (this.step2CodeRetry <= 0): {
          this.messageService.error("Bạn đã thử vượt quá số lần cho phép...xin vui lòng thực hiện tại từ đầu")
          this.closeForgotPassword()
          return
        }
        default: {
          this.messageService.error("Mã code bạn đã nhập không đúng")
          return
        }
      }
    }
    this.forgotPasswordStep = 3
  }

  isPasswordValidate(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
  }

  onClickSubmitNewForgotPassword(): void {
    if(!this.newPassword || !this.newConfirmPassword){
      this.messageService.error('Vui lòng điền vào mật khẩu mới và mật khẩu xác nhận để tiếp tục')
    }
    this.isLoadingForgotPassword = true
    this.accountService.put(this.account.phone, {
      accountName: this.account.name,
      accountAddress: this.account.address,
      accountPassword: this.newPassword,
      accountRole: this.account.role,
      accountActive: this.account.active,
      accountEmail: this.account.email
    }).pipe(finalize(() => {
      this.isLoadingForgotPassword = false
    })).subscribe({
      next: (res) => {
        if(res.status){
          this.messageService.success('Cập nhật mật khẩu mới thành công, xin vui lòng đăng nhập lại.')
          this.closeForgotPassword()
        }else this.messageService.error(res.message)
      },
      error: (err) => {
        this.messageService.error(err.error.message)
      }
    })
  }

  renewForm(): void {
    this.isLoadingForgotPassword = false
    this.forgotPasswordStep = 1
    this.forgotPasswordEmailInput = ''
    this.forgotPasswordCode = ''
    this.newPassword = ''
    this.newConfirmPassword = ''
    this.step2Code = ''
    this.step2CodeRetry = 10
  }
}
