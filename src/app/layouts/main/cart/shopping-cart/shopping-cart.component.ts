import { Component } from '@angular/core';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { DetailOrderData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  public DetailOrder: DetailOrder[] = DetailOrderData
  public icons: Icon = icons

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(price);
  }
}
