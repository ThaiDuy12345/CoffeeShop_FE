import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-step-two-ordering',
  templateUrl: './step-two-ordering.component.html',
  styleUrls: ['./step-two-ordering.component.scss']
})
export class StepTwoOrderingComponent {
  @Input() public ordering: Ordering = new Ordering()
  @Input() public detailOrders: DetailOrder[] = []
  @Input() public user: Account = new Account()
  public icons: Icon = icons
  public selectedMethod: "COD" | "ZaloPay" | "Momo" = "COD"

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
