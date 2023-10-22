import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { ProductData } from 'src/app/data/data';
import { Ordering } from 'src/app/core/models/ordering.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { DetailOrderData, OrderingData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-history-ordering',
  templateUrl: './history-ordering.component.html',
  styleUrls: ['./history-ordering.component.scss']
})
export class HistoryOrderingComponent implements OnInit{
  public ordering: Ordering[] = []
  public icons: Icon = icons
  public selectedStepIndex: number = 1
  public mostPopularProducts: Product[] = ProductData
  public priceFilter: [number, number] = [0, 100]
  constructor(
    private formatService: FormatService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.loadOrdering()
  }

  loadOrdering(): void {
    const user = Cookies.get('id')
    if(!user) return

    this.ordering = OrderingData.filter(ordering => ordering.account.phone === user)
  }

  getStatus(status: number): string {
    switch (status) {
      case 1: return 'Đơn hàng đã được đặt và đợi xác nhận thông tin'
      case 2: return 'Đơn hàng đã được xác nhận và đợi bàn giao cho đơn vị vận chuyển'
      case 3: return 'Đơn hàng đã được bàn giao và đang trên đường tới chỗ bạn'
      case 4: return 'Đơn hàng đã được giao thành công'
      case -1: return 'Đơn hàng đã bị huỷ'
      default: return 'Bạn vẫn chưa đặt hàng'
    }
  }

  timeSince(date: number): string {
    return this.formatService.timeAgoSince(new Date(date));
  }

  formatPrice(price: number | undefined): string {
    if (price === undefined) return ''
    return this.formatService.formatPrice(price);
  }

  getDetailOrder(ordering: Ordering): DetailOrder[]{
    return DetailOrderData.filter(detailOrder => detailOrder.ordering.id === ordering.id)
  }

  getSelectedIndex(orderingStatus: number): number {
    switch(orderingStatus) {
      case 1: return 0
      case 2: return 1
      case 3: return 2
      case 4: return 4
      default: return 5
    }
  }

  getWidth(): number {
    return window.innerWidth
  }

  navigate(id: string){
    this.router.navigateByUrl(`/main/product/${id}`)
  }
}
