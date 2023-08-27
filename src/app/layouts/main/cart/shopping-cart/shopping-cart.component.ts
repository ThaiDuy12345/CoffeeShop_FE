import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { AccountData, DetailOrderData, OrderData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  public detailOrder: DetailOrder[] = []
  public icons: Icon = icons
  public user: Account = new Account()

  ngOnInit(): void {
    const id = Cookies.get('id')
    if(!id) return

    const res = AccountData.find(a => a.id === id)
    this.user = res ? res : new Account()

    this.detailOrder = DetailOrderData.filter(o => o.order.account.id === this.user.id)
  }

  formatPrice(price: number = 0): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(price);
  }
}
