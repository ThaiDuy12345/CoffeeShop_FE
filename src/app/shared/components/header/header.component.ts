import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { NbContextMenuComponent, NbContextMenuContext, NbContextMenuDirective, NbMenuItem } from '@nebular/theme';
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
          icon: 'umbrella-outline'
        },
        {
          title: 'COFFEE',
          icon: 'droplet-outline'
        },
        {
          title: 'SẢN PHẨM GÓI',
          icon: 'archive-outline'
        },
      ],
    },
    {
      label: 'Đơn hàng',
      icon: icons['faCartShopping'],
      items: [
        {
          title: 'GIỎ HÀNG',
          icon: 'shopping-cart-outline'
        },
        {
          title: 'ĐƠN HÀNG BẠN ĐÃ MUA',
          icon: 'shopping-bag-outline'
        }
      ],
    },
    {
      label: 'Về chúng tôi',
      icon: icons['faHandHoldingHeart'],
    }
  ];
  public user = {
    label: `Chúc bạn 1 ngày tốt lành`,
    name: "",
    icon: icons['faUser'],
    items: [
      {
        title: 'THÔNG TIN',
        icon: 'person-outline',
      },
      {
        title: 'ĐĂNG XUẤT',
        icon: 'arrow-circle-right-outline',
      }
    ]
  }

  ngOnInit(): void {
    const user = AccountData.find(item => item.id === Cookies.get('id'))
    if (user) this.user.name = user.name
  }
}
