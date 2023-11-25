import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-ordering-management',
  templateUrl: './ordering-management.component.html',
  styleUrls: ['./ordering-management.component.scss']
})
export class OrderingManagementComponent implements OnInit, OnDestroy{
  public icons: Icon = icons
  public orderings: Ordering[] = []
  public choosingOrdering: Ordering = new Ordering()
  public isLoading: boolean = false
  public searchInput: string = ""
  public tempSubject: Subject<any> = new Subject<any>()
  public account: Account = new Account()
  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private orderingService: OrderingService,
    private mappingService: MappingService,
    private authenticationStore: AuthenticationStore
  ){}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.initData()

    this.tempSubject.subscribe({
      next: res => this.account = res.account,
      error: err => {
        this.messageService.error(err.error.message)
      }
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }

  // initCategoryData(): void {
  //   this.categoryService.getAll().subscribe({
  //     next: res => {
  //       if(res.status){
  //         this.categoryFilterList = res.data.map((c: any) => {
  //           return {
  //             text: c.categoryName,
  //             value: c.categoryId
  //           }
  //         })
  //       }else{
  //         this.messageService.error(res.message)
  //       }
  //     },  
  //     error: err => {
  //       this.messageService.error(err.error.message)
  //     }
  //   })
  // }

  initData(): void {
    this.isLoading = true
    this.orderingService.getAll().pipe(
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe({
      next: res => {
        if(res.status){
          this.orderings = res.data.map((p: any) => this.mappingService.ordering(p))
          if(this.searchInput){
            this.orderings = this.orderings.filter(p => {
              return (
                p.id.toString().includes(this.searchInput.toLowerCase()) ||
                p.account.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
                this.formatPrice(p.totalPrice).includes(this.searchInput.toLowerCase())  ||
                this.formatDate(p.date).toLowerCase().includes(this.searchInput.toLowerCase()) 
              )
            })
          }
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.messsage)
      }
    })
  }


  onSearchInput(): void {
    this.initData()
  }

  formatDate(date: number): string {
    return this.formatService.formatDate(new Date(date))
  }

  formatPrice(price: number): string {
    return this.formatService.formatPrice(price)
  }

  viewAOrdering(data: Ordering): void {
    if(!data) return
    this.choosingOrdering = data
  }

  dateSort(a: Ordering, b: Ordering): number {
    return new Date(a.date) > new Date(b.date) ? 1 : -1
  }

  priceSort(a: Ordering, b: Ordering): number {
    return a.totalPrice - b.totalPrice
  }

  statusFilter(statusFilter: number[], item: Ordering): boolean {
    return statusFilter.includes(item.status)
  }

  statusSort(a: Ordering, b: Ordering): number {
    return a.status - b.status
  }

  paymentStatusFilter(paymentStatusFilter: null | 1 | -1 | 2 | -2 | 0, item: Ordering): boolean {
    return item.paymentStatus === paymentStatusFilter
  }

  onConfirmToApprove(data: Ordering): void {
    this.orderingService.put({ orderingId: data.id, payload: {
      orderingStatus: data.status + 1,
      orderingShippingFee: data.shippingFee,
      discountEntity: data.discount.id ? {
        discountId: data.discount.id
      } : null,
      orderingPaymentStatus: data.paymentStatus,
      updatedByAccountEntity: {
        accountPhone: this.account.phone
      }
    }}).subscribe({
      next: res => {
        if(!res.status){
          this.messageService.error(res.message)
          return
        }
        this.messageService.success("Thao tác thành công")
        const index = this.orderings.findIndex(or => or.id === data.id)
        const newArr = [...this.orderings]
        newArr[index] = {...this.mappingService.ordering(res.data)}
        this.orderings = [...newArr]
        console.log(this.orderings)
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  getPaymentStatus(status: null | 0 | 1 | -1){
    switch(status){
      case null: return "Chưa thanh toán"
      case 0: return "Thanh toán COD"
      case 1: return "Thanh toán VNPay"
      case -1: return "Hoàn tiền thông qua VNPay"
    }
  }

  // activeSort(a: Ordering, b: Ordering): number {
  //   return a.active ? 1 : -1
  // }

  // activeFilter(activeFilter: boolean, item: Ordering): boolean {
  //   return item.active === activeFilter
  // }
}
