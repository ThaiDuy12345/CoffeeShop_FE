import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { DetailOrderService } from 'src/app/core/services/detail-order.service';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public detailOrders: DetailOrder[] = []
  public ordering: Ordering = new Ordering()
  public icons: Icon = icons
  public user: Account = new Account()
  public isLoading: boolean = false
  @Input() public account: Account = new Account()
  public currentIndexItem: number = -1
  public currentQuantityItem: number = 0
  public isLoadingButton: boolean = false
  constructor(
    private filterStore: FilterStore,
    private formatService: FormatService,
    private orderingService: OrderingService,
    private detailOrderService: DetailOrderService,
    private mappingService: MappingService,
    private messageService: NzMessageService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.fetchCurrentOrderingCart(this.account.phone)
  }

  onClickSaveEditQuantity(item: DetailOrder): void {
    if(this.currentQuantityItem < 1){
      this.messageService.error("Số lượng sản phẩm không hợp lệ")
      return
    }
    this.isLoadingButton = true
    this.detailOrderService.put({
      detailOrderId: {
        orderingId: this.ordering.id,
        productSizeId: item.productSize.id
      },
      detailOrderProductQuantity: this.currentQuantityItem
    }).pipe(finalize(() => this.isLoadingButton = false)).subscribe({
      next: res => {
        if(res.status) {
          this.messageService.success("Thao tác thành công")
          this.onClickCancelEditQuantity()
          this.fetchCurrentOrderingCart(this.account.phone)
        }
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  onClickEditQuantity(item: DetailOrder, index: number): void {
    this.currentIndexItem = index
    this.currentQuantityItem = item.quantity
  }

  onClickCancelEditQuantity(): void {
    this.currentIndexItem = -1
    this.currentQuantityItem = 0
  }

  fetchCurrentOrderingCart(accountPhone: string): void {
    this.isLoading = true
    this.orderingService.getTheCurrentCart({ accountPhone: accountPhone }).subscribe({
      next: res => {
        if(res.status){
          this.ordering = { ...this.mappingService.ordering(res.data) }
          this.fetchDetailOrders();
        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message),
    })
  }

  fetchDetailOrders(): void {
    this.detailOrderService.getByOrderId({ orderingId: this.ordering.id }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: res => {
        if(res.status){
          this.detailOrders = res.data.map((o: any) => this.mappingService.detailOrder(o)) 
        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message),
    })
  }

  formatPrice(price: number = 0): string {
    return this.formatService.formatPrice(price)
  }

  navigate(): void {
    this.filterStore.update({
      category: [],
      search: ''
    })
    this.router.navigateByUrl('/main/product')
  }

  getTotalQuantity(): number {
    let quantity = 0
    this.detailOrders.forEach((item) => {
      quantity = quantity + item.quantity
    })
    return quantity
  }

  onClickDeleteProductSize(item: DetailOrder): void {
    this.detailOrderService.delete({
      orderingId: this.ordering.id,
      productSizeId: item.productSize.id
    }).subscribe({
      next: res => {
        if(res.status) {
          this.messageService.success("Xoá sản phẩm thành công")
          this.fetchCurrentOrderingCart(this.account.phone)
        }
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
    
  }
}
