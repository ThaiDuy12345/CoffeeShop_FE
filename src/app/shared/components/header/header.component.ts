import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Location } from '@angular/common';
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
      link: '/main/product',
      subItems: [
        {
          title: 'TRÀ',
          icon: icons['faGlassWater'],
          link: 'tea',
        },
        {
          title: 'COFFEE',
          icon: icons['faMugHot'],
          link: 'coffee',
        },
        {
          title: 'ĐỒ ĂN',
          icon: icons['faUtensils'],
          link: 'food',
        },
        {
          title: 'SẢN PHẨM GÓI',
          icon: icons['faCubes'],
          link: 'package',
        },
      ],
    },
    {
      label: 'Đơn hàng',
      icon: 'barcode',
      link: '/main/cart',
      subItems: [
        {
          title: 'GIỎ HÀNG',
          icon: icons['faCartShopping'],
          link: '',
        },
        {
          title: 'ĐƠN HÀNG BẠN ĐÃ MUA',
          icon: icons['faCartFlatbed'],
          link: '',
        },
      ],
    },
    {
      label: 'Về chúng tôi',
      icon: 'book',
      link: '/main/about',
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
  public search: string = '';
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

  onClickNavigate(categoryName: any): void {
    this.filterStore.update({
      category: categoryName,
    });
    this.location.path.toString().includes('/main/product') && this.router.navigate(['/main/product'])
  }

  onSubmitSearch(): void {
    this.filterStore
      ._select((state) => state.category)
      .subscribe((category) => {
        this.filterStore.update({
          category: category,
          search: this.search,
        });
        this.location.path.toString().includes('/main/product') && this.router.navigate(['/main/product'])
      });
    
  }
}
