import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Order } from 'src/app/core/models/order.model';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from 'src/app/shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { Account } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-step-one-order',
  templateUrl: './step-one-order.component.html',
  styleUrls: ['./step-one-order.component.scss']
})
export class StepOneOrderComponent {
  @Input() public order: Order = new Order()
  @Input() public detailOrders: DetailOrder[] = []
  @Input() public user: Account = new Account()
  public icons: Icon = icons

  constructor(
    private router: Router,
    private formatService: FormatService
  ){}

  navigate(id: string): void {
    this.router.navigate([`/main/product/${id}`])
  }

  formatPrice(price: number | undefined): string {
    return price === undefined ? this.formatService.formatPrice(0) : this.formatService.formatPrice(price)
  }
}
