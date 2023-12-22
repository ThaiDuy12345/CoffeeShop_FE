import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize } from 'rxjs';
import { Discount } from 'src/app/core/models/discount.model';
import { Icon } from 'src/app/core/models/icon.model';
import { DiscountService } from 'src/app/core/services/discount.service';
import { icons } from 'src/app/shared/utils/icon.utils';
import { differenceInCalendarDays } from "date-fns"
import { OrderingService } from 'src/app/core/services/ordering.service';
import { MappingService } from 'src/app/core/services/mapping.service';
@Component({
  selector: 'app-detail-discount-management',
  templateUrl: './detail-discount-management.component.html',
  styleUrl: './detail-discount-management.component.scss'
})
export class DetailDiscountManagementComponent implements OnInit{
  public icons: Icon = icons
  public isNew: boolean = false
  public choosingDiscount: Discount = new Discount()
  public editDiscount: Discount = new Discount()
  public submitLoading: boolean = false
  public isLoading: boolean = false;
  public expiredDate?: Date = undefined
  public isEditable: boolean = true

  constructor(
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>,
    private discountService: DiscountService,
    private orderingService: OrderingService,
    private mappingService: MappingService
  ){}

  ngOnInit(): void {
    this.initAccount()
  }

  initAccount(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
      if(!id) {
        this.isNew = true
        this.expiredDate = new Date()
        return
      }
      this.isLoading = true
      this.discountService.getById({ discountId: id }).pipe(
        finalize(() => {
          this.isLoading = false
          this.expiredDate = new Date(this.editDiscount.expiredDate) || new Date()
        })
      ).subscribe({
        next: (res) => {
          this.choosingDiscount = this.mappingService.discount(res.data)
          this.editDiscount = { ...this.choosingDiscount }
        },
        error: (err: any) => this.messageService.error(err.error.message)
      })

      this.orderingService.getAll().subscribe({
        next: res => {
          if(res.status){
            this.isEditable = res.data.filter((p: any) =>
              p.discountEntity !== null && p.discountEntity.discountId === id
            ).length > 0
          }else{
            this.messageService.error(res.message)
            this.isEditable = false
          }
        },
        error: err => {
          this.messageService.error(err.error.message)
          this.isEditable = false
        }
      })
    })
  }

  onInputDiscountCode(): void {
    this.editDiscount.code = this.editDiscount.code.toUpperCase()
  }

  onChangeExpiredDate(){
    if(this.expiredDate) this.editDiscount.expiredDate = this.expiredDate.getTime()
  }

  onClickCancelEdit(): void {
    this.editDiscount = new Discount()
    this.choosingDiscount = new Discount()
    this.router.navigateByUrl('admin/discount-management')
    this.expiredDate = undefined
  }

  open(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog, {
      context: 'Bạn có muốn xác nhận đổi thông tin?',
    });
  }

  onClickSubmit() {
    if (
      !this.editDiscount.code ||
      !this.editDiscount.expiredDate ||
      !this.editDiscount.amount ||
      !this.editDiscount.minimumOrderPrice ||
      !(this.editDiscount.minimumOrderPrice >= 0) ||
      !(this.editDiscount.amount >= 0) ||
      !(this.editDiscount.amount < this.editDiscount.minimumOrderPrice)
    ) {
      this.dialogRef.close();
      this.messageService.error('Bạn cần điền hết thông tin để tiếp tục!!');
      return;
    }
    this.submitLoading = true

    const observable: Observable<any> = ( this.choosingDiscount.id && !this.isNew ) ?
      this.discountService.put(this.choosingDiscount.id, {
        discountCode: this.editDiscount.code,
        discountCreationDate: this.editDiscount.creationDate,
        discountExpiredDate: this.editDiscount.expiredDate,
        discountAmount: this.editDiscount.amount,
        discountMinimumOrderPrice: this.editDiscount.minimumOrderPrice,
      })
        :
      this.discountService.post({
        discountCode: this.editDiscount.code,
        discountCreationDate: new Date().getTime(),
        discountExpiredDate: this.editDiscount.expiredDate,
        discountAmount: this.editDiscount.amount,
        discountMinimumOrderPrice: this.editDiscount.minimumOrderPrice,
      })

    observable.pipe(finalize(() => {
      this.dialogRef.close();
      this.submitLoading = false
    })).subscribe({
      next: (res: any) => {
        if(res.status){
          this.messageService.success('Thao tác thành công');
          this.onClickCancelEdit()
        }else this.messageService.error('Thao tác thất bại');
      },
      error: (err: any) => this.messageService.error(err.error.message)
    })
  }

  disabledDate(current: Date): boolean {
    return differenceInCalendarDays(new Date, current) > 0;
  }

  generateDatePattern(): void {
    const dateRef = new Date()

    const date = dateRef.getDate().toString().toUpperCase()
    const month = (dateRef.getMonth() + 1).toString().toUpperCase()
    const year = dateRef.getFullYear().toString().slice(2, 4).toUpperCase()

    const pattern = `${date}${month}${year}`

    this.editDiscount.code = this.editDiscount.code.includes(pattern) ? this.editDiscount.code : (this.editDiscount.code + pattern)
  }
}
