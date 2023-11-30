import { Component, Input } from '@angular/core';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-product-by-feedback-quantity-statistic',
  templateUrl: './product-by-feedback-quantity-statistic.component.html',
  styleUrl: './product-by-feedback-quantity-statistic.component.scss'
})
export class ProductByFeedbackQuantityStatisticComponent {
  public icons: Icon = icons
  @Input() public isStaff: boolean = true
  @Input() public productFeedbackQuantityStatistic: {
    productId: number,
    productName: string,
    productActive: boolean,
    productFeedbackQuantity: number
  }[] = []
}
