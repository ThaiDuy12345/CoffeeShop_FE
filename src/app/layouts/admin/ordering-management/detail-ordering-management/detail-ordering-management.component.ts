import { ActivatedRoute, Router } from '@angular/router';
import { Component, Optional, TemplateRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { icons } from 'src/app/shared/utils/icon.utils';
import { DetailOrderService } from 'src/app/core/services/detail-order.service';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-detail-ordering-management',
  templateUrl: './detail-ordering-management.component.html',
  styleUrls: ['./detail-ordering-management.component.scss']
})
export class DetailOrderingManagementComponent {
  public icons: Icon = icons
  public ordering: Ordering = new Ordering()
  public isLoading: boolean = false
  public detailOrders: DetailOrder[] = []
  public detailOrderPaginates: DetailOrder[] = []
  public detailOrderPaginateSize: number = 3
  public disabledCoolDownCancelOrder: number = 0

  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private orderingService: OrderingService,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
    private mappingService: MappingService,
    private activatedRoute: ActivatedRoute,
    private detailOrderService: DetailOrderService,
    private router: Router
  ){}

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
                    this.geDetailOrdersByPage(1)
                  }
                  else this.messageService.error(res.message)
                },
                error: err => this.messageService.error(err.error.message)
              })
            }else this.messageService.error(res.message)
          },
          error: (err) => this.messageService.error(err.error.message)
        })
      },
      error: err => {
        this.router.navigateByUrl('/admin/ordering-management')
        this.messageService.error("Id đơn hàng không tồn tại")
      }
    })
  }

  geDetailOrdersByPage(pageIndex: number): void {
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
      case 4: return 4
      default: return 5
    }
  }

  openToApprove(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  openToCancel(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
  }

  onConfirmToCancel(dialog: TemplateRef<any>): void {
    this.dialogRef.close()
    this.dialogRef = this.dialogService.open(dialog);
    this.disabledCoolDownCancelOrder = 5
    const interval = setInterval(() => {
      if(this.disabledCoolDownCancelOrder === 0) clearInterval(interval)
      else this.disabledCoolDownCancelOrder--
    }, 1000)
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
