import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from 'src/app/core/models/icon.model';
import { AccountService } from 'src/app/core/services/account.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  public visible: boolean = false
  public icons: Icon = icons
  public user = {
    label: `Xin chào`,
    name: '',
    icon: 'user',
    tag: 'user-tag',
    subItems: [
      {
        title: 'THÔNG TIN',
        icon: icons['faCircleInfo'],
        link: '/main/user'
      },
      {
        title: 'ĐĂNG XUẤT',
        icon: icons['faArrowRightFromBracket'],
      },
    ],
  };
  constructor(
    private router: Router,
    private message: NzMessageService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    const userPhone = Cookies.get('id')
    if(userPhone === undefined) return
    
    this.accountService.getByPhone({ accountPhone: userPhone }).subscribe({
      next: (res) => {
        if (res.status) {
          this.user.name = res.data.accountName;
        }
      },
      error: (err) => {

      }
    })
  }

  onClickSignOut(): void {
    Cookies.remove('id');
    this.message.success(
      `Đăng xuất thành công, Tạm biệt bạn ${this.user.name}`
    );
    this.router.navigate(['/sign-in']);
  }

  isMobileScreen(): Boolean {
    return window.innerWidth < 950
  }
}
