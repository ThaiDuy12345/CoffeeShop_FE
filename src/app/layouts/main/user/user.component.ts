import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/core/services/account.service';
import { AccountData } from 'src/app/data/data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  public isEdit: Boolean = false
  public user: Account = new Account()
  public selectedTab: 'INFORMATION_TAB' | 'CHANGE_PASSWORD_TAB' = 'INFORMATION_TAB'
  constructor(
    private router: Router,
    private accountService: AccountService,
    private messageService: NzMessageService
  ){}

  ngOnInit() {
    const id = Cookies.get('id')
    if(!id){
      this.router.navigate(['/sign-in'])
      return
    }

    this.accountService.getByPhone({ accountPhone: id }).subscribe({
      next: (res) => {
        if(res.status){
          this.user = {
            name: res.data.accountName,
            phone: res.data.accountPhone,
            email: res.data.accountEmail,
            password: res.data.accountPassword,
            address: res.data.accountAddress,
            role: res.data.accountRole,
            active: res.data.accountActive
          }
        }else{
          this.messageService.error("Đã có lỗi xảy ra")
        }
      },
      error: (err) => {
        this.messageService.error("Đã có lỗi xảy ra")
      }
    })
  }
}
