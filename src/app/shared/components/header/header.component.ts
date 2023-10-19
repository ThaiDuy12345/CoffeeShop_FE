import { Component, OnDestroy, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AccountData, NotificationData } from 'src/app/data/data';
import { icons } from '../../utils/icon.utils';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Location } from '@angular/common';
import { Icon } from 'src/app/core/models/icon.model';
import { Notification } from 'src/app/core/models/notification.model';
import { AccountService } from 'src/app/core/services/account.service';
import { Subject } from 'rxjs';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public visible: boolean = false
  public icons: Icon = icons
  public notifications: Notification[] = NotificationData
  private tempSubject: Subject<any> = new Subject<any>
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
    },
    {
      label: 'Về chúng tôi',
      icon: 'book',
      link: '/main/about',
    },
    {
      label: 'Hỗ trợ',
      icon: 'mail',
      link: '/main/support',
    }
  ];
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
        title: 'SẢN PHẨM YÊU THÍCH',
        icon: icons['faHeart'],
        link: '/main/favorite-product'
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
    private location: Location,
    private authenticationStore: AuthenticationStore
  ) {}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.tempSubject.subscribe({
      next: (res) => {
        if(res.account.phone){
          this.user.name = res.account.name;
          res.account.role === 0 && this.user.subItems.push({
            title: 'TRANG ADMIN',
            icon: icons['faUserTie'],
            link: '/admin/admin-dashboard'
          })
        }
      }
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }

  onClickSignOut(): void {
    Cookies.remove('id');
    this.message.success(
      `Đăng xuất thành công, Tạm biệt bạn ${this.user.name}`
    );
    this.router.navigate(['/sign-in']);
  }

  onClickNavigate(categoryName: string): void {
    this.filterStore.update((state) => {
      return {
        category: [categoryName],
        search: ''
      }
    });
    !(this.location.path().includes('/main/product')) && this.router.navigate(['/main/product'])
  }

  isMobileScreen(): Boolean {
    return window.innerWidth < 950
  }
}
