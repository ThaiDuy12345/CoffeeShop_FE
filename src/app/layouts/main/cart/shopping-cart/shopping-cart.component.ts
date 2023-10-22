import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { FormatService } from 'src/app/core/services/format.service';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { AccountData, DetailOrderData, OrderingData } from 'src/app/data/data';
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
  constructor(
    private filterStore: FilterStore,
    private router: Router,
    private formatService: FormatService
  ){}
  ngOnInit(): void {
    const id = Cookies.get('id')
    if(!id) return

    const res = AccountData.find(a => a.phone === id)
    this.user = res ? res : new Account()

    this.detailOrder = DetailOrderData.filter(o => o.ordering.account.phone === this.user.phone)
  }

  formatPrice(price: number = 0): string {
    return this.formatService.formatPrice(price)
  }

  navigate(): void {
    this.filterStore.update({
      category: [],
      search: ''
    })
    this.router.navigateByUrl('/main/product')
  }

  getTotalQuantity(): number {
    let quantity = 0
    this.detailOrder.forEach((item) => {
      quantity = quantity + item.quantity
    })
    return quantity
  }
}
