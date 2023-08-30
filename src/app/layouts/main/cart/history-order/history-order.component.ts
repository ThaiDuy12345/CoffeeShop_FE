import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Order } from 'src/app/core/models/order.model';
import { FormatService } from 'src/app/core/services/format.service';
import { DetailOrderData, OrderData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit{
  public order: Order[] = []
  public icons: Icon = icons
  public selectedStepIndex: number = 1
  constructor(
    private formatService: FormatService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.loadOrder()
  }

  loadOrder(): void {
    const user = Cookies.get('id')
    if(!user) return

    this.order = OrderData.filter(order => order.account.id === user)
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

  timeSince(date: string): string {
    return this.formatService.timeAgoSince(new Date(date));
  }

  formatPrice(price: number | undefined): string {
    if (price === undefined) return ''
    return this.formatService.formatPrice(price);
  }

  getDetailOrder(order: Order): DetailOrder[]{
    return DetailOrderData.filter(detailOrder => detailOrder.order.id === order.id)
  }

  getSelectedIndex(orderStatus: number): number {
    switch(orderStatus) {
      case 1: return 0
      case 2: return 1
      case 3: return 2
      case 4: return 4
      default: return 5
    }
  }

  navigate(id: string){
    this.router.navigateByUrl(`/main/product/${id}`)
  }
}
