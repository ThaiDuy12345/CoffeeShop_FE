import { AuthenticationState, AuthenticationStore } from './../../../../core/stores/authentication.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Optional, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { icons } from 'src/app/shared/utils/icon.utils';
import { DetailOrderService } from 'src/app/core/services/detail-order.service';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Account } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-detail-ordering-management',
  templateUrl: './detail-ordering-management.component.html',
  styleUrl: './detail-ordering-management.component.scss'
})
export class DetailOrderingManagementComponent implements OnInit, OnDestroy{
  public icons: Icon = icons
  public ordering: Ordering = new Ordering()
  public isLoading: boolean = false
  public account: Account = new Account()
  public detailOrders: DetailOrder[] = []
  public detailOrderPaginates: DetailOrder[] = []
  public detailOrderPaginateSize: number = 3
  public disabledCoolDownCancelOrder: number = 0
  public isLoadingButton: boolean = false
  public failReason: string = ""
  public approveDescription: string = ""
  public cancelDescription: string = ""
  public tempSubject: Subject<any> = new Subject<any>()

  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private orderingService: OrderingService,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
    private mappingService: MappingService,
    private activatedRoute: ActivatedRoute,
    private detailOrderService: DetailOrderService,
    private router: Router,
    private authenticationStore: AuthenticationStore
  ){}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.activatedRoute.params.subscribe({
      next: params => {
        if(!params['id']){
          this.router.navigateByUrl('/admin/ordering-management')
          this.messageService.error("Id đơn hàng không tồn tại")
          return
        }
        this.orderingService.getById({ orderingId: params['id'] }).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe({
          next: (res) => {
            if(res.status){
              if(res.data.orderingStatus === 0){
                this.router.navigateByUrl('/admin/ordering-management')
                this.messageService.error("Đơn hàng vẫn chưa hợp lệ để xét duyệt")
                return
              }
              this.ordering = this.mappingService.ordering(res.data)
              this.detailOrderService.getByOrderId({ orderingId: params['id'] }).subscribe({
                next: res => {
                  if(res.status) {
                    this.detailOrders = res.data.map((p: any) => this.mappingService.detailOrder(p))
                    this.getDetailOrdersByPage(1)
                  }
                  else this.messageService.error(res.message)
                },
                error: err => this.messageService.error(err.error.message)
              })
            }else this.messageService.error(res.message)
          },
          error: (err) => this.messageService.error(err.error.message)
        })

        this.tempSubject.subscribe({
          next: res => this.account = res.account
        })

        this.authenticationStore._select(state => state).subscribe(this.tempSubject)
      },
      error: err => {
        this.router.navigateByUrl('/admin/ordering-management')
        this.messageService.error("Id đơn hàng không tồn tại")
      }
    })
  }

  checkIfDontNeedToApprove(): boolean {
    return (
      (this.ordering.paymentStatus === 1)  &&
      (this.ordering.totalPrice >= 150000 || this.getProductLength() >= 5) &&
      this.ordering.status === 1
    )
  }

  getPaymentStatus(status: null | 0 | 1 | -1){
    switch(status){
      case null: return "Chưa thanh toán"
      case 0: return "Thanh toán COD"
      case 1: return "Thanh toán VNPay"
      case -1: return "Hoàn tiền thông qua VNPay"
    }
  }

  checkIfNeedToApprove(): boolean {
    return (
      !(this.ordering.paymentStatus === 1)  &&
      (this.ordering.totalPrice >= 150000 || this.getProductLength() >= 5) &&
      this.ordering.status === 1
    )
  }

  onConfirmToApprove(): void {
    if(this.checkIfNeedToApprove() && this.approveDescription.length === 0){
      this.messageService.warning("Bạn cần gọi xác nhận với khách hàng trước")
      return
    }

    this.isLoadingButton = true
    this.orderingService.put({ orderingId: this.ordering.id, payload: {
      orderingStatus: this.ordering.status + 1,
      orderingShippingFee: this.ordering.shippingFee,
      discountEntity: this.ordering.discount.id ? {
        discountId: this.ordering.discount.id
      } : null,
      orderingPaymentStatus: this.ordering.paymentStatus,
      orderingApproveDescription: this.ordering.status === 1 ? this.approveDescription : null,
      updatedByAccountEntity: {
        accountPhone: this.account.phone
      }
    }}).pipe(
      finalize(() => {
        this.isLoadingButton = false
        this.dialogRef.close()
      })
    ).subscribe({
      next: res => {
        if(!res.status){
          this.messageService.error(res.message)
          return
        }
        this.messageService.success("Thao tác thành công")
        this.ordering = {...this.mappingService.ordering(res.data)}
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  getDetailOrdersByPage(pageIndex: number): void {
    const startIndex = (pageIndex - 1) *this.detailOrderPaginateSize;
    const endIndex = startIndex + this.detailOrderPaginateSize;
    this.detailOrderPaginates = this.detailOrders.slice(startIndex, endIndex);
  }

  confirmChange(orderingId: string): void{
  }

  timeSince(date: number): string {
    return this.formatService.timeAgoSince(new Date(date));
  }

  formatDate(date: number): string {
    return this.formatService.formatTimeStamp(date)
  }

  formatPrice(data: number): string {
    return this.formatService.formatPrice(data)
  }

  getSelectedIndex(orderingStatus: number): number {
    switch(orderingStatus) {
      case 1: return 0
      case 2: return 1
      case 3: return 2
      default: return 3
    }
  }

  openToApprove(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  openToCancel(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  openConfirmToCancel(dialog: TemplateRef<any>): void {
    this.dialogRef.close()
    this.dialogRef = this.dialogService.open(dialog);
    this.disabledCoolDownCancelOrder = 5
    const interval = setInterval(() => {
      if(this.disabledCoolDownCancelOrder === 0) clearInterval(interval)
      else this.disabledCoolDownCancelOrder--
    }, 1000)
  }

  onConfirmToCancel(): void {
    this.isLoadingButton = true
    this.orderingService.put({ orderingId: this.ordering.id, payload: {
      orderingStatus: -1,
      orderingShippingFee: this.ordering.shippingFee,
      discountEntity: this.ordering.discount.id ? {
        discountId: this.ordering.discount.id
      } : null,
      orderingPaymentStatus: this.ordering.paymentStatus === 1 ? -1 : this.ordering.paymentStatus,
      orderingCancelDescription: [1, 2].includes(this.ordering.status) ? this.cancelDescription : null,
      updatedByAccountEntity: {
        accountPhone: this.account.phone
      }
    }}).pipe(
      finalize(() => {
        this.isLoadingButton = false
        this.dialogRef.close()
      })
    ).subscribe({
      next: res => {
        if(!res.status){
          this.messageService.error(res.message)
          return
        }
        this.messageService.success("Thao tác thành công")
        this.ordering = {...this.mappingService.ordering(res.data)}
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  onConfirmToFail(): void {
    if(!this.failReason){
      this.messageService.error("Xin hãy điền lý do thất bại để tiếp tục")
      return
    }
    this.isLoadingButton = true
    this.orderingService.put({ orderingId: this.ordering.id, payload: {
      orderingStatus: -1,
      orderingShippingFee: this.ordering.shippingFee,
      orderingNote: this.ordering.note ? this.ordering.note  + ` - (${this.failReason})` : `(${this.failReason})`,
      discount: this.ordering.discount ? {
        discountId: this.ordering.discount.id
      } : null,
      orderingPaymentStatus: this.ordering.paymentStatus,
      updatedByAccountEntity: {
        accountPhone: this.account.phone
      }
    }}).pipe(
      finalize(() => {
        this.isLoadingButton = false
        this.dialogRef.close()
      })
    ).subscribe({
      next: res => {
        if(!res.status){
          this.messageService.error(res.message)
          return
        }
        this.messageService.success("Thao tác thành công")
        this.ordering = {...this.mappingService.ordering(res.data)}
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  openToFail(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  getWidth(): number {
    return window.innerWidth
  }

  navigate(productId: string): void {
    this.router.navigateByUrl(`/main/product/${productId}`)
  }

  getProductLength(): number {
    let sum = 0
    this.detailOrders.forEach((item) => sum += item.quantity)
    return sum
  }
}
