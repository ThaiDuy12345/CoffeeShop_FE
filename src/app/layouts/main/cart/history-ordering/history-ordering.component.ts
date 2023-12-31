import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { DetailOrderData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';
import { Account } from 'src/app/core/models/account.model';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MappingService } from 'src/app/core/services/mapping.service';
import { DetailOrderService } from 'src/app/core/services/detail-order.service';

@Component({
  selector: 'app-history-ordering',
  templateUrl: './history-ordering.component.html',
  styleUrl: './history-ordering.component.scss'
})
export class HistoryOrderingComponent implements OnInit{
  public orderings: Ordering[] = []
  public icons: Icon = icons
  public selectedStepIndex: number = 1
  public isLoadingDetailOrder: boolean = false
  // public priceFilter: [number, number] = [0, 100]
  public detailOrders: DetailOrder[] = []
  @Input() account: Account = new Account()
  public isLoading: boolean = false
  public detailOrderPaginate: DetailOrder[] = []
  public detailOrderPaginateSize: number = 3
  public filterOrderings: Ordering[] = []
  public selectedType: number[] = []
  constructor(
    private router: Router,
    private orderingService: OrderingService,
    private messageService: NzMessageService,
    private mappingService: MappingService,
    private detailOrderService: DetailOrderService,
  ){}

  ngOnInit(): void {
    this.loadOrdering()
  }

  loadOrdering(): void {
    this.isLoading = true
    this.orderingService.getAllByAccount({
      accountPhone: this.account.phone
    }).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        if(res.status) {
          this.orderings = res.data.filter((o: any) => o.orderingStatus !== 0).map((o: any) => this.mappingService.ordering(o))
          this.filterOrdering()
          this.isLoading = false
        }
        else this.messageService.error(res.message)
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  filterOrdering(): void {
    if(this.selectedType.length === 0){
      this.filterOrderings = [...this.orderings]
    }else{
      this.filterOrderings = this.orderings.filter(o => this.selectedType.includes(o.status))
    }
  }

  filterChange(): void {
    this.loadOrdering()
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

  onActiveOrderChange(isActive: boolean, orderId: string): void {
    if(!isActive) {
      this.detailOrders = []
      return
    }

    this.isLoadingDetailOrder = true
    this.detailOrderService.getByOrderId({ orderingId: orderId }).pipe(
      finalize(() => this.isLoadingDetailOrder = false)
    ).subscribe({
      next: res => {
        if(res.status) {
          this.detailOrders = res.data.map((o: any) => this.mappingService.detailOrder(o)) 
          this.getDetailOrdersByPage(1)
        }
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }
  

  getDetailOrdersByPage(pageIndex: number): void {
    const startIndex = (pageIndex - 1) * this.detailOrderPaginateSize;
    const endIndex = startIndex + this.detailOrderPaginateSize;
    this.detailOrderPaginate = this.detailOrders.slice(startIndex, endIndex);
  }

  getDetailOrder(ordering: Ordering): DetailOrder[]{
    return DetailOrderData.filter(detailOrder => detailOrder.ordering.id === ordering.id)
  }

  getSelectedIndex(orderingStatus: number): number {
    switch(orderingStatus) {
      case 1: return 0
      case 2: return 1
      case 3: return 2
      default: return 3
    }
  }

  getPaymentStatus(status: null | 0 | 1 | -1){
    switch(status){
      case null: return "Chưa thanh toán"
      case 0: return "Thanh toán COD"
      case 1: return "Thanh toán VNPay"
      case -1: return "Hoàn tiền thông qua VNPay"
    }
  }

  getWidth(): number {
    return window.innerWidth
  }

  navigate(id: string){
    this.router.navigateByUrl(`/main/product/${id}`)
  }
}
