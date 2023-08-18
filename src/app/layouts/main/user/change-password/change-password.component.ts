import { Component, Input, TemplateRef, Optional } from '@angular/core';
import { Account } from 'src/app/core/models/account.model';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  @Input() user: Account = new Account()
  public oldPassword: string = ""
  public newPassword: string = ""
  public confirmPassword: string = ""
  public isValid: boolean = false
  public passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  constructor(
    private dialogService: NbDialogService,
    @Optional() protected dialogRef: NbDialogRef<any>,
    private messageService: NzMessageService,
    private router: Router
  ){}

  checkingValid(): void{
    this.isValid = this.oldPassword === this.user.password
  }

  open(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog, { context: 'Bạn có muốn xác nhận đổi mật khẩu?' });
  }

  onClickSubmit() {
    this.dialogRef.close()
    this.messageService.success("Thay đổi mật khẩu thành công, vui lòng đăng nhập lại!!")
    Cookies.remove('id')
    this.router.navigate(['/sign-in'])
  }

  isValidForConfirm(): boolean{
    return this.passwordRegex.test(this.newPassword) && this.newPassword === this.confirmPassword
  }

}
