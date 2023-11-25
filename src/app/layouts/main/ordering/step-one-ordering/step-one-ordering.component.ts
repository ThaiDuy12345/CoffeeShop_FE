import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { icons } from 'src/app/shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { Account } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-step-one-ordering',
  templateUrl: './step-one-ordering.component.html',
  styleUrl: './step-one-ordering.component.scss'
})
export class StepOneOrderingComponent implements OnInit {
  @Input() public ordering: Ordering = new Ordering()
  @Input() public detailOrders: DetailOrder[] = []
  @Input() public account: Account = new Account()
  public detailOrderPaginateSize: number = 3
  public detailOrderPaginate: DetailOrder[] = []
  public icons: Icon = icons

  constructor(
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getDetailOrdersByPage(1)
  }

  navigate(id: string): void {
    this.router.navigate([`/main/product/${id}`])
  }

  getDetailOrdersByPage(pageIndex: number): void {
    const startIndex = (pageIndex - 1) * this.detailOrderPaginateSize;
    const endIndex = startIndex + this.detailOrderPaginateSize;
    this.detailOrderPaginate = this.detailOrders.slice(startIndex, endIndex);
  }
}
