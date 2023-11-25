import { Icon } from 'src/app/core/models/icon.model';
import { AdminSidebarStore } from './../../../core/stores/admin-siderbar.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { icons } from '../../utils/icon.utils';
import { Subject } from 'rxjs';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
  public icons: Icon = icons
  public isCollapsed: boolean = false;
  public initAdminSidebarState = new Subject<any>();
  public adminRoleState = new Subject<any>();
  public isAdmin: boolean = true
  public items = [
    {
      label: 'Trang Chính',
      icon: 'home',
      link: '/admin/admin-dashboard',
      required: false
    },
    {
      label: 'Layout Web',
      icon: 'layout',
      required: true,
      subItems: [
        {
          title: 'Banner',
          icon: icons['faImage'],
          link: '/admin/layout-management/banner',
        },
        {
          title: 'Sản phẩm Hot',
          icon: icons['faDiceSix'],
          link: '/admin/layout-management/popular-product',
        }
      ],
    },
    {
      label: 'Tài Khoản',
      icon: 'user',
      link: '/admin/account-management',
      required: true
    },
    {
      label: 'Sản Phẩm',
      icon: 'appstore',
      link: '/admin/product-management',
      required: true
    },
    {
      label: 'Danh Mục Sản Phẩm',
      icon: 'book',
      link: '/admin/category-management',
      required: true
    },
    {
      label: 'Đánh Giá Sản Phẩm',
      icon: 'notification',
      link: '/admin/feedback-management',
      required: true
    },
    {
      label: 'Đơn Hàng',
      icon: 'coffee',
      link: '/admin/ordering-management',
      required: false
    },
    {
      label: 'Giảm giá',
      icon: 'barcode',
      link: '/admin/discount-management',
      required: true
    },
    {
      label: 'Đơn Hỗ Trợ',
      icon: 'mail',
      link: '/admin/support-management',
      required: true
    },
  ];
  constructor(
    private adminSidebarStore: AdminSidebarStore,
    private authenticationStore: AuthenticationStore
  ){}

  ngOnDestroy(): void {
    this.initAdminSidebarState.complete()
  }

  ngOnInit(): void {
    this.initAdminSidebar()
    this.initAdminRole()
  }

  initAdminRole(): void {
    this.adminRoleState.subscribe(state => {
      this.isAdmin = state.account.role === 0
    })
    this.authenticationStore._select((state) => state).subscribe(this.adminRoleState);
  }

  initAdminSidebar(): void {
    this.initAdminSidebarState.subscribe(state => {
      this.isCollapsed = state.state === 'compacted'
    })
    this.adminSidebarStore._select((state) => state).subscribe(this.initAdminSidebarState);
  }
  
  changeState(): void {
    this.adminSidebarStore.update(state => {
      if(state.state === "expanded"){
        return {
          state: "compacted"
        }
      }else {
        return {
          state: "expanded"
        }
      }
    })
  }

  sideBarValidate(required: boolean): boolean {
    if(this.isAdmin) return true
    
    return !required
  }
}
