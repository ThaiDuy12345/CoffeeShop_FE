import { Component, Input, Optional, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Discount } from 'src/app/core/models/discount.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { DiscountService } from 'src/app/core/services/discount.service';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-step-two-ordering',
  templateUrl: './step-two-ordering.component.html',
  styleUrls: ['./step-two-ordering.component.scss']
})
export class StepTwoOrderingComponent implements OnInit{
  @Input() public ordering: Ordering = new Ordering()
  @Input() public detailOrders: DetailOrder[] = []
  @Input() public account: Account = new Account()
  public isEditingDiscount: boolean = true
  public icons: Icon = icons
  public discountCode: string = ""
  public isLoadingDiscountCheckButton: boolean = false
  public isLoadingDiscountModal: boolean = false
  public discounts: Discount[] = []
  public choosingDiscount: Discount = new Discount()
  public isLoadingConfirmButton: boolean = false
  constructor(
    private router: Router,
    private formatService: FormatService,
    private mappingService: MappingService,
    private discountService: DiscountService,
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    @Optional() private dialogRef: NbDialogRef<any>,
  ){}

  ngOnInit(): void {
    this.ordering.paymentStatus = 0
    this.ordering.discount = new Discount()
  }

  navigate(id: string): void {
    this.router.navigate([`/main/product/${id}`])
  }

  formatPrice(price: number | undefined): string {
    return price === undefined ? this.formatService.formatPrice(0) : this.formatService.formatPrice(price)
  }

  checkDiscountCode(): void {
    this.isLoadingDiscountCheckButton = true
    this.discountService.getByCode({ discountCode: this.discountCode }).pipe(finalize(() => this.isLoadingDiscountCheckButton = false)).subscribe({
      next: res => {
        if(res.status){
          if(new Date(res.discountExpiredDate) <= new Date()){
            this.messageService.success("Mã giảm giá đã hết hạn sử dụng")
            return
          }
          this.ordering.discount = { ...this.mappingService.discount(res.data) }
          this.choosingDiscount = { ...this.ordering.discount }
          this.discountCode = this.ordering.discount.code
          this.isEditingDiscount = false
          this.messageService.success("Đã áp dụng mã giảm giá")
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  cancelDiscountCode(): void {
    this.isEditingDiscount = true
    this.ordering.discount = new Discount()
    this.choosingDiscount = this.ordering.discount.code ? this.choosingDiscount : new Discount()
  }

  openDiscountModal(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
    this.loadDiscountList()
  }

  loadDiscountList(): void {
    this.isLoadingDiscountModal = true
    this.discountService.getAll().pipe(finalize(() => this.isLoadingDiscountModal = false)).subscribe({
      next: res => {
        if(res.status){
          this.discounts = res.data.filter((d: any) => new Date(d.discountExpiredDate) > new Date())
            .map((d: any) => this.mappingService.discount(d))
        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  formatNumber(number: number): string {
    return this.formatService.formatPrice(number)
  }

  formatDate(date: number): string {
    return this.formatService.formatTimeStamp(date);
  }

  onClickSubmitNewDiscount(): void {
    this.ordering.discount = {...this.choosingDiscount}
    this.discountCode = this.ordering.discount.code
    this.isEditingDiscount = false
    this.messageService.success("Đã áp dụng mã giảm giá")
    this.dialogRef.close()
  }

  timeSince(date: number): string {
    return this.formatService.timeFromNow(new Date(date));
  }
}
