import { error } from '@ant-design/icons-angular';
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
import { MappingService } from 'src/app/core/services/mapping.service';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { FeedBackData } from 'src/app/data/data';
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
  public searchInputDetailAdminVisible: string = ""
  public inforVisible: boolean = false
  public detailAdminVisible: boolean = false
  public detailVisible: boolean = false
  public choosingAccount: Account = new Account()
  public accountFeedbacks: FeedBack[] = []
  public accountOrderings: Ordering[] = []
  public searchInput: string = ""
  public isLoadingChoosingOrdering: boolean = false

  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private accountService: AccountService,
    private mappingService: MappingService,
    private orderingService: OrderingService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.accountService.getAll().subscribe({
      next: (res) => {
        if(res.status){
          this.accounts = res.data.map((acc: any) => this.mappingService.account(acc))

          if(this.searchInput){
            this.accounts = this.accounts.filter((a) => {
              if(   
                  a.email.includes(this.searchInput)
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

  formatPrice(price: number): string {
    return this.formatService.formatPrice(price)
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
    this.choosingAccount = {...data}
    if(this.detailAdminVisible){
      this.searchInputDetailAdminVisible = ''
      this.getOrderingUpdatedByAccount()
    }else{
      this.getAccountFeedbacks()
      this.getAccountOrderings()
    }
  }

  getOrderingUpdatedByAccount(): void {
    this.isLoadingChoosingOrdering = true
    this.orderingService.getAllByUpdatedByAccount({ accountPhone: this.choosingAccount.phone }).pipe(finalize(() => this.isLoadingChoosingOrdering = false)).subscribe({
      next: res => {
        if(res.status) {
          this.accountOrderings = res.data.map((o: any) => this.mappingService.ordering(o))
          if(this.searchInputDetailAdminVisible.trim()){
            this.accountOrderings = this.accountOrderings.filter(a => {
              return(
                a.id.toString().includes(this.searchInputDetailAdminVisible.trim().toLowerCase()) ||
                this.formatDate(a.date).toLowerCase().includes(this.searchInputDetailAdminVisible.trim().toLowerCase()) ||
                this.formatPrice(a.totalPrice).toLowerCase().includes(this.searchInputDetailAdminVisible.trim().toLowerCase()) ||
                (a.approveDescription && a.approveDescription.toLowerCase().includes(this.searchInputDetailAdminVisible.trim().toLowerCase())) ||
                (a.cancelDescription && a.cancelDescription.toLowerCase().includes(this.searchInputDetailAdminVisible.trim().toLowerCase()))
              )
            })
          }
        }
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })    
  }

  filterByDetailAdminVisibleInputSearch(): void {
    this.getOrderingUpdatedByAccount()
  }

  getAccountFeedbacks(): FeedBack[]{
    return FeedBackData.filter(fb => fb.account.phone === this.choosingAccount.phone)
  }

  getAccountOrderings(): void{
    this.isLoadingChoosingOrdering = true
    this.orderingService.getAllByAccount({ accountPhone: this.choosingAccount.phone }).pipe(finalize(() => this.isLoadingChoosingOrdering = false)).subscribe({
      next: res => {
        if(res.status) this.accountOrderings = res.data.map((o: any) => this.mappingService.ordering(o))
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
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
