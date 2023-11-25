import { Component, OnDestroy, OnInit, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import Cookies from 'js-cookie';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { DetailOrderService } from 'src/app/core/services/detail-order.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrl: './ordering.component.scss'
})
export class OrderingComponent implements OnInit, OnDestroy{
  public icons: Icon = icons
  public current: number = 0 
  public ordering: Ordering = new Ordering()
  public detailOrders: DetailOrder[] = []
  public isLoading: boolean = false
  public account: Account = new Account()
  public tempSubject: Subject<any> = new Subject<any>()
  public isLoadingConfirmButton: boolean = false
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: NzMessageService,
    private orderingService: OrderingService,
    private detailOrderService: DetailOrderService,
    private mappingService: MappingService,
    private authenticationStore: AuthenticationStore,
    private dialogService: NbDialogService,
    @Optional() private dialogRef: NbDialogRef<any>,
  ){}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if(params['id']) {
        this.tempSubject.subscribe({
          next: res => {
            if(res.account && res.account.phone){
              this.isLoading = true
              this.account = res.account
              this.fetchCurrentOrderingCart(params['id'])
            }else{
              this.router.navigate(['/main/dashboard'])
              this.messageService.error("Không thể lấy được thông tin người dùng")
            }
          },
          error: err => this.messageService.error(err.error.message)
        })

        this.authenticationStore._select(state => state).subscribe(this.tempSubject)
      }else {
        this.router.navigate(['/main/dashboard'])
        this.messageService.error("Mã hóa đơn không tồn tại hoặc không hợp lệ")
      }
    })
  }

  fetchCurrentOrderingCart(orderingId: string): void {
    this.orderingService.getById({ orderingId: orderingId }).subscribe({
      next: res => {
        if(res.status){
          if(res.data.orderingStatus !== 0){
            this.router.navigate(['/main/dashboard'])
            this.messageService.error("Mã hóa đơn không tồn tại hoặc không hợp lệ")
            return
          }
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
  
  onClickNextStep(newStep: number): void {
    if(newStep !== 2) {
      this.current = newStep
      return
    }
    this.submitOrder()
  }

  submitOrder(): void {
    this.isLoadingConfirmButton = true
    this.orderingService.put({ orderingId: this.ordering.id, payload: {
      orderingStatus: 1,
      orderingShippingFee: this.ordering.shippingFee,
      discountEntity: this.ordering.discount.id ? {
        discountId: this.ordering.discount.id
      } : null,
      orderingPaymentStatus: this.ordering.paymentStatus,
      orderingNote: this.ordering.note,
      updatedByAccountEntity: null
    }}).pipe(finalize(() => {
      this.isLoadingConfirmButton = false
      this.dialogRef.close()
    })).subscribe({
      next: res => {
        if(res.status) this.current = 2
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  getWidth(): number {
    return window.innerWidth
  }

  openModal(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

}
