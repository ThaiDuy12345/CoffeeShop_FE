import { Icon } from 'src/app/core/models/icon.model';
import { AdminSidebarStore } from './../../../core/stores/admin-siderbar.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { icons } from '../../utils/icon.utils';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
  public icons: Icon = icons
  public isCollapsed: boolean = false;
  public initAdminSidebarState = new Subject<any>();
  public items = [
    {
      label: 'Trang Chính',
      icon: 'home',
      link: '/admin/admin-dashboard'
    },
    {
      label: 'Layout Web',
      icon: 'layout',
      subItems: [
        {
          title: 'Banner',
          icon: icons['faImage'],
          link: '/admin/layout-management/banner'
        },
        {
          title: 'Sản phẩm Hot',
          icon: icons['faDiceSix'],
          link: '/admin/layout-management/popular-product'
        }
      ],
    },
    {
      label: 'Tài Khoản',
      icon: 'user',
      link: '/admin/account-management'
    },
    {
      label: 'Sản Phẩm',
      icon: 'appstore',
      link: '/admin/product-management'
    },
    {
      label: 'Danh Mục Sản Phẩm',
      icon: 'book',
      link: '/admin/category-management'
    },
    {
      label: 'Phản Hồi Sản Phẩm',
      icon: 'notification',
      link: '/admin/feedback-management'
    },
    {
      label: 'Đơn Hàng',
      icon: 'coffee',
      link: '/admin/order-management'
    },
    {
      label: 'Khuyến Mãi',
      icon: 'barcode',
      link: '/admin/sales-management'
    },
    {
      label: 'Đơn Hỗ Trợ',
      icon: 'mail',
      link: '/admin/support-management'
    },
  ];
  constructor(
    private adminSidebarStore: AdminSidebarStore
  ){}

  ngOnDestroy(): void {
    this.initAdminSidebarState.complete()
  }

  ngOnInit(): void {
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
}
