import { Component, OnInit } from '@angular/core';
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { FeedBack } from 'src/app/core/models/feedback.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { AccountService } from 'src/app/core/services/account.service';
import { FormatService } from 'src/app/core/services/format.service';
import { AccountData, FeedBackData, OrderingData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  public accounts: Account[] = []
  public isLoading: boolean = false
  public icons: Icon = icons
  public inforVisible: boolean = false
  public detailVisible: boolean = false
  public choosingAccount: Account = new Account()
  public accountFeedbacks: FeedBack[] = []
  public accountOrderings: Ordering[] = []
  public searchInput: string = ""

  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private accountService: AccountService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.accountService.getAll().subscribe({
      next: (res) => {
        if(res.status){
          this.accounts = res.data.map((acc: any) => {
            return {
              phone: acc.accountPhone,
              name: acc.accountName,
              email: acc.accountEmail,
              password: acc.accountPassword,
              role: acc.accountRole,
              active: acc.accountActive,
              address: acc.accountAddress
            }
          })

          if(this.searchInput){
            this.accounts = this.accounts.filter((a) => {
              if(   a.email.includes(this.searchInput)
                 || a.name.includes(this.searchInput)
                 || a.phone.includes(this.searchInput)
                ) return true

              return false
            })
          }
        }
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
        console.log(err)
        this.messageService.error(err.error.message)
      }
    })
  }

  filterBySearch(): void {
    this.initData()
  }

  confirmChange(accountPhone: string, active: boolean): void{
    const index = this.accounts.findIndex(account => account.phone === accountPhone)
    if(index !== -1){
      this.isLoading = true
      this.accountService.put(this.accounts[index].phone, {
        accountName: this.accounts[index].name,
        accountEmail: this.accounts[index].email,
        accountPassword: this.accounts[index].password,
        accountActive: active,
        accountRole: this.accounts[index].role,
        accountAddress: this.accounts[index].address
      }).pipe(finalize(() => {
        this.isLoading = false
      })).subscribe({
        next: (res) => {
          if(res.status){
            this.messageService.success("Thay đổi trạng thái thành công")
            this.accounts[index].active = res.data.accountActive
          }else{
            this.messageService.error(res.message)
          }
        },
        error: (err) => {
          this.messageService.error(err.error.message)
          
        }
      })
    }else{
      this.messageService.error("Thay đổi trạng thái thất bại")
    }
  }
  
  formatDate(date: number): string {
    return this.formatService.formatTimeStamp(date)
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
    this.accountOrderings = this.getAccountOrderings()
  }

  getAccountFeedbacks(): FeedBack[]{
    return FeedBackData.filter(fb => fb.account.phone === this.choosingAccount.phone)
  }

  getAccountOrderings(): Ordering[]{
    return OrderingData.filter(ordering => ordering.account.phone === this.choosingAccount.phone)
  }

  activeSortOrdering(a: Account, b: Account): number {
    return a.active === true ? 1 : -1
  }

  isActiveFilter(isActiveFilter: boolean, item: Account): boolean {
    return item.active === isActiveFilter
  }

  roleSortOrdering(a: Account, b: Account): number {
    if(a.role === 0 && b.role === 1){
      return 1
    }else if(a.role === 0 && b.role === 2){
      return 1
    }else {
      return -1
    }
  }

  roleFilter(roleFilter: number[], item: Account): boolean {
    return roleFilter.includes(item.role)
  }
}
