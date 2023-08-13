import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData } from 'src/app/data/data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public items = [
    {
      label: 'Sản phẩm',
      icon: 'fa-solid fa-mug-hot',
      items: [
        {
          label: 'TRÀ',
          icon: 'fa-solid fa-glass-water',
        },
        {
          label: 'COFFEE',
          icon: 'fa-solid fa-mug-hot',
        },
        {
          label: 'SẢN PHẨM GÓI',
          icon: 'fa-solid fa-cubes',
        },
      ],
    },
    {
      label: 'Đơn hàng',
      icon: 'fa-solid fa-cart-shopping',
      items: [
        {
          label: 'GIỎ HÀNG',
          icon: 'fa-solid fa-trailer',
        },
        {
          label: 'ĐƠN HÀNG BẠN ĐÃ MUA',
          icon: 'fa-solid fa-cart-flatbed',
        }
      ],
    },
    {
      label: 'Về chúng tôi',
      icon: 'fa-solid fa-hand-holding-heart',
    }
  ];

  ngOnInit(): void {
    const user = AccountData.find(item => item.id === Cookies.get('id'))
    if(user) {
      this.items.unshift({
        label: `Chào bạn, ${user.name}!`,
        icon: 'fa-solid fa-user',
        items: [
          {
            label: 'THÔNG TIN',
            icon: 'fa-solid fa-circle-info',
          },
          {
            label: '<span class="error-text-color">ĐĂNG XUẤT</span>',
            icon: 'fa-solid fa-arrow-right-from-bracket',
          }
        ]
      })
    }
  }
}
