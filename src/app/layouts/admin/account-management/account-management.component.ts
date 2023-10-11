import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Account } from 'src/app/core/models/account.model';
import { FeedBack } from 'src/app/core/models/feedback.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Order } from 'src/app/core/models/order.model';
import { FormatService } from 'src/app/core/services/format.service';
import { AccountData, FeedBackData, OrderData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent{
  public accounts: Account[] = AccountData
  public icons: Icon = icons
  public inforVisible: boolean = false
  public detailVisible: boolean = false
  public choosingAccount: Account = new Account()
  public accountFeedbacks: FeedBack[] = []
  public accountOrders: Order[] = []


  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
  ){}

  confirmChange(accountId: string, status: boolean): void{
    const index = this.accounts.findIndex(account => account.id === accountId)
    if(index !== -1){
      this.accounts[index].status = status
      this.messageService.success("Thay đổi trạng thái thành công")
    }else{
      this.messageService.error("Thay đổi trạng thái thất bại")
    }
  }
  
  formatDate(date: Date | string): string {
    if(date){
      return this.formatService.formatDate(
        typeof date === "string" ? new Date(date) : date
      )
    }
    return this.formatService.formatDate(new Date())
  }

  renderStarColor(star: number): string {
    switch (true) {
      case star === 0:
        return 'rgb(121, 125, 133)';
      default:
        return '#FADB14'
    }
  }

  viewAnAccount(data: Account): void {
    if(!data) return
    this.choosingAccount = data
    this.accountFeedbacks = this.getAccountFeedbacks()
    this.accountOrders = this.getAccountOrders()
  }

  getAccountFeedbacks(): FeedBack[]{
    return FeedBackData.filter(fb => fb.account.id === this.choosingAccount.id)
  }

  getAccountOrders(): Order[]{
    return OrderData.filter(order => order.account.id === this.choosingAccount.id)
  }

  // priceSortOrder(a: Product, b: Product): number {
  //   return a.price - b.price
  // }

  // isPopularFilter(isPopularFilter: boolean, item:Product): boolean {
  //   return item.isPopular === isPopularFilter
  // }
}
