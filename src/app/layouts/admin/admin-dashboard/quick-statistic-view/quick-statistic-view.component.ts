import { Subject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { icons } from 'src/app/shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';

@Component({
  selector: 'app-quick-statistic-view',
  templateUrl: './quick-statistic-view.component.html',
  styleUrl: './quick-statistic-view.component.scss'
})
export class QuickStatisticViewComponent {
  public icons: Icon = icons
  @Input() public isStaff: boolean = true
  @Input() public quickViewStatistic: {
    accountStatistic: number,
    orderingStatistic: number,
    productStatistic: number,
    supportStatistic: number
  } = {
    accountStatistic: 0,
    orderingStatistic: 0,
    productStatistic: 0,
    supportStatistic: 0
  }
}
