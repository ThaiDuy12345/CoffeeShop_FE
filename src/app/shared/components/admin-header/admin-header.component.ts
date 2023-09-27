import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData, NotificationData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Location } from '@angular/common';
import { Icon } from 'src/app/core/models/icon.model';
import { Notification } from 'src/app/core/models/notification.model';
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
    private filterStore: FilterStore,
    private location: Location
  ) {}
  ngOnInit(): void {
    const user = AccountData.find((item) => item.id === Cookies.get('id'));
    if (user) this.user.name = user.name;
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
