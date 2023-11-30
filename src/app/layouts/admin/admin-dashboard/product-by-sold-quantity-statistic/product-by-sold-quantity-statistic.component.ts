import { Component, Input } from '@angular/core';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-product-by-sold-quantity-statistic',
  templateUrl: './product-by-sold-quantity-statistic.component.html',
  styleUrl: './product-by-sold-quantity-statistic.component.scss'
})
export class ProductBySoldQuantityStatisticComponent {
  public icons: Icon = icons
  @Input() public isStaff: boolean = true
  @Input() public productSoldQuantityStatistic: {
    productId: number,
    productName: string,
    productActive: boolean,
    productSoldQuantity: number
  }[] = []
}
