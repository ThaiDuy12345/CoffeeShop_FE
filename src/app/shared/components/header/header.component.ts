import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items = [
    {
      label: 'Sản phẩm',
      icon: 'appstore',
      subItems: [
        {
          title: 'TRÀ',
          icon: icons['faGlassWater'],
        },
        {
          title: 'COFFEE',
          icon: icons['faMugHot'],
        },
        {
          title: 'SẢN PHẨM GÓI',
          icon: icons['faCubes'],
        },
      ],
    },
    {
      label: 'Đơn hàng',
      icon: 'barcode',
      subItems: [
        {
          title: 'GIỎ HÀNG',
          icon: icons['faCartShopping'],
        },
        {
          title: 'ĐƠN HÀNG BẠN ĐÃ MUA',
          icon: icons['faCartFlatbed'],
        },
      ],
    },
    {
      label: 'Về chúng tôi',
      icon: 'book',
    },
  ];
  public user = {
    label: `Xin chào`,
    name: '',
    icon: 'user',
    tag: 'user-tag',
    subItems: [
      {
        title: 'THÔNG TIN',
        icon: icons['faCircleInfor'],
      },
      {
        title: 'ĐĂNG XUẤT',
        icon: icons['faArrowRightFromBracket'],
      },
    ],
  };
  constructor(
    private router: Router,
    private message: NzMessageService 
  ) {}
  ngOnInit(): void {
    const user = AccountData.find((item) => item.id === Cookies.get('id'));
    if (user) this.user.name = user.name;
  }

  onClickSignOut(): void {
    Cookies.remove('id');
    this.message.success(`Đăng xuất thành công, Tạm biệt bạn ${this.user.name}`)
    setTimeout(() => this.router.navigate(['/sign-in']), 2000);
  }
}
