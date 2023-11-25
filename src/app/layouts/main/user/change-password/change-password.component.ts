import { Component, Input, TemplateRef, Optional } from '@angular/core';
import { Account } from 'src/app/core/models/account.model';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { AccountService } from 'src/app/core/services/account.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  @Input() user: Account = new Account()
  public oldUserPassword: string = ""
  public newPassword: string = ""
  public confirmPassword: string = ""
  public isValid: boolean = false
  public passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  public submitLoading: boolean = false
  constructor(
    private dialogService: NbDialogService,
    @Optional() protected dialogRef: NbDialogRef<any>,
    private messageService: NzMessageService,
    private router: Router,
    private accountService: AccountService
  ){}

  checkingValid(): void{
    this.isValid = this.oldUserPassword === this.user.password
  }

  open(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog, { context: 'Bạn có muốn xác nhận đổi mật khẩu?' });
  }

  onClickSubmit() {
    this.submitLoading = true
    this.accountService.put(this.user.phone, {
      accountName: this.user.name,
      accountAddress: this.user.address,
      accountPassword: this.newPassword,
      accountRole: this.user.role,
      accountActive: this.user.active,
      accountEmail: this.user.email
    }).pipe(finalize(() => {
      this.dialogRef.close();
      this.submitLoading = false
    })).subscribe({
      next: (res) => {
        if(res.status){
          this.messageService.success("Thay đổi mật khẩu thành công, vui lòng đăng nhập lại!!")
          Cookies.remove('id')
          this.router.navigate(['/sign-in'])
        }else{
          this.messageService.error("Thay đổi mật khẩu không thành công, vui lòng thử lại!!")
        }
      },
      error: (err) => {
        this.messageService.error(err.error.message)
      }
    })
  }

  isValidForConfirm(): boolean{
    return this.passwordRegex.test(this.newPassword) && this.newPassword === this.confirmPassword
  }

}
