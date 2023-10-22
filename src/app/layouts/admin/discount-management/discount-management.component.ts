import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Discount } from 'src/app/core/models/discount.model';
import { Icon } from 'src/app/core/models/icon.model';
import { DiscountService } from 'src/app/core/services/discount.service';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-discount-management',
  templateUrl: './discount-management.component.html',
  styleUrls: ['./discount-management.component.scss']
})
export class DiscountManagementComponent implements OnInit{
  public icons: Icon = icons
  public discounts: Discount[] = []
  public detailVisible: boolean = false
  public inforVisible: boolean = false
  public choosingDiscount: Discount = new Discount()
  public isLoading: boolean = false

  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private discountService: DiscountService
  ){}

  ngOnInit(): void {
    this.isLoading = true
    this.initData()
  }

  initData(): void {
    this.discountService.getAll().pipe(
      finalize(() => {
        this.isLoading = false      
      })
    ).subscribe({
      next: (res) => {
        if(res.status){
          this.discounts = res.data.map((acc: any) => {
            return {
              id: acc.discountId,
              code: acc.discountCode,
              creationDate: acc.discountCreationDate,
              expiredDate: acc.discountExpiredDate,
              minimumOrderPrice: acc.discountMinimumOrderPrice,
              amount: acc.discountAmount,
              orderings: acc.orderingEntities
            }
          })
        }else{
          this.messageService.error(res.message)
        }
      },
      error: (err) => {
        this.messageService.error(err.error.message)
      }
    })
  }

  confirmChange(discountId: string): void{
    const index = this.discounts.findIndex(discount => discount.id === discountId)
    if(index !== -1){
      this.isLoading = true
      this.discountService.put(this.discounts[index].id, {
        discountId: this.discounts[index].id,
        discountCode: this.discounts[index].code,
        discountCreationDate: this.discounts[index].creationDate,
        discountExpiredDate:  new Date().getTime(),
        discountMinimumOrderPrice: this.discounts[index].minimumOrderPrice,
        discountAmount: this.discounts[index].amount
      }).pipe(finalize(() => {
        this.isLoading = false
      })).subscribe({
        next: (res) => {
          if(res.status){
            this.messageService.success("Thao tác thành công, mã giảm giá đã không còn hiệu lực")
            this.discounts[index].expiredDate = res.data.discountExpiredDate
          }else{
            this.messageService.error(res.message)
          }
        },
        error: (err) => {
          this.messageService.error(err.error.message)
          
        }
      })
    }else{
      this.messageService.error("Thao thác thất bại")
    }
  }

  compareDate(from: number, to: number): boolean{
    return new Date(from) >= new Date() && new Date() <= new Date(to)
  }

  formatDate(date: number): string {
    return this.formatService.formatTimeStamp(date)
  }

  formatNumber(data: number): string {
    return this.formatService.formatPrice(data)
  }

  viewADiscount(data: Discount): void {
    if(!data) return
    this.choosingDiscount = data
  }
}
