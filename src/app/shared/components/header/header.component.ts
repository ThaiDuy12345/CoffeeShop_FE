import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items = [
    {
      label: 'Sản phẩm',
      icon: icons['faMugHot'],
      items: [
        {
          title: 'TRÀ',
          icon: 'umbrella-outline',
        },
        {
          title: 'COFFEE',
          icon: 'droplet-outline',
        },
        {
          title: 'SẢN PHẨM GÓI',
          icon: 'archive-outline',
        },
      ],
    },
    {
      label: 'Đơn hàng',
      icon: icons['faCartShopping'],
      items: [
        {
          title: 'GIỎ HÀNG',
          icon: 'shopping-cart-outline',
        },
        {
          title: 'ĐƠN HÀNG BẠN ĐÃ MUA',
          icon: 'shopping-bag-outline',
        },
      ],
    },
    {
      label: 'Về chúng tôi',
      icon: icons['faHandHoldingHeart'],
    },
  ];
  public user = {
    label: `Chúc bạn 1 ngày tốt lành`,
    name: '',
    icon: icons['faUser'],
    tag: 'user-tag',
    items: [
      {
        title: 'THÔNG TIN',
        icon: 'person-outline',
      },
      {
        title: 'ĐĂNG XUẤT',
        icon: 'arrow-circle-right-outline',
      },
    ],
  };
  constructor(
    private nbMenuService: NbMenuService,
    private alertService: AlertService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.setEvent();
    const user = AccountData.find((item) => item.id === Cookies.get('id'));
    if (user) this.user.name = user.name;
  }

  setEvent(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-tag'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === 'ĐĂNG XUẤT') {
          Cookies.remove('id');
          setTimeout(() => {
            this.alertService.success(
              'Thành công',
              `Đăng xuất thành công, Tạm biệt bạn ${this.user.name}`
            );
            setTimeout(() => this.router.navigate(['/sign-in']), 2000);
          }, 1000);
        }
      });
  }
}
