import { Component, Input, Optional, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Discount } from 'src/app/core/models/discount.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { DiscountService } from 'src/app/core/services/discount.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-step-two-ordering',
  templateUrl: './step-two-ordering.component.html',
  styleUrl: './step-two-ordering.component.scss'
})
export class StepTwoOrderingComponent implements OnInit{
  @Input() public ordering: Ordering = new Ordering()
  @Input() public detailOrders: DetailOrder[] = []
  @Input() public account: Account = new Account()
  public isEditingDiscount: boolean = true
  public icons: Icon = icons
  public discountCode: string = ""
  public isLoadingDiscountCheckButton: boolean = false
  public discounts: Discount[] = []
  public choosingDiscount: Discount = new Discount()
  public isLoadingConfirmButton: boolean = false
  public isLoadingDiscountModal: boolean = false
  constructor(
    private router: Router,
    private mappingService: MappingService,
    private discountService: DiscountService,
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    @Optional() private dialogRef: NbDialogRef<any>,
  ){}

  ngOnInit(): void {
    this.ordering.paymentStatus = 0
    this.ordering.shippingFee = this.ordering.shippingFee + (2000 * this.getTotalQuantity()) 
    this.ordering.totalPrice = this.ordering.price + this.ordering.shippingFee
    this.ordering.discount = new Discount()
  }

  loadDiscountList(): void {
    this.isLoadingDiscountModal = true
    this.discountService.getAll().pipe(finalize(() => this.isLoadingDiscountModal = false)).subscribe({
      next: res => {
        if(res.status){
          this.discounts = 
            res.data.filter((d: any) => new Date(d.discountExpiredDate) > new Date())
              .sort((a: any) => a.discountMinimumOrderPrice - this.ordering.price)
              .map((d: any) => this.mappingService.discount(d))
        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  navigate(id: string): void {
    this.router.navigate([`/main/product/${id}`])
  }

  getTotalQuantity(): number {
    let quantity = 0
    this.detailOrders.forEach((item) => {
      quantity = quantity + item.quantity
    })
    return quantity
  }

  checkDiscountCode(): void {
    if(!this.discountCode.trim()){
      this.messageService.error("Cần phải có mã giảm giá để có thể áp dụng")
      return
    }
    this.isLoadingDiscountCheckButton = true
    this.discountService.getByCode({ discountCode: this.discountCode }).pipe(finalize(() => this.isLoadingDiscountCheckButton = false)).subscribe({
      next: res => {
        if(res.status){
          if(new Date(res.data.discountExpiredDate) <= new Date()){
            this.messageService.error("Mã giảm giá đã hết hạn, xin vui lòng chọn mã giảm giá khác")
            return
          }
          if(res.data.discountMinimumOrderPrice > this.ordering.price){
            this.messageService.error("Đơn hàng của bạn không đạt đủ điều kiện để sử dụng mã giảm giá, xin vui lòng chọn mã giảm giá khác")
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
  }

  openDiscountModal(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog);
    this.choosingDiscount = this.ordering.discount.code ? this.choosingDiscount : new Discount()
    this.loadDiscountList()
  }

  onClickChoosingDiscount(item: Discount): void {
    this.choosingDiscount = { ...item }
  }

  onClickSubmitNewDiscount(): void {
    if(!(this.choosingDiscount && this.choosingDiscount.code)){
      return
    }
    this.discountCode = this.choosingDiscount.code
    this.checkDiscountCode()
    this.dialogRef.close()
  }
}
