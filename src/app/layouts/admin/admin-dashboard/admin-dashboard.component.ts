import { StatisticService } from './../../../core/services/statistic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize, forkJoin, map } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy{
  public icons: Icon = icons
  public time: string = 'Tuần vừa qua'
  public type: string = 'Tài khoản được tạo'
  public timeOptions: string[] = ['Tuần vừa qua', 'Tháng vừa qua', '6 tháng vừa qua', 'Năm vừa qua'];
  public typeOptions: string[] = ['Tài khoản được tạo', 'Sản phẩm bán ra', 'Hoá đơn', 'Phản hồi', 'Thư hỗ trợ'];
  public isStaff: boolean = false
  public isLoading: boolean = false
  public statistic: {
    accountStatistic: number,
    orderingStatistic: number,
    productStatistic: number,
    supportStatistic: number
  } = {
    accountStatistic: 0,
    orderingStatistic: 0,
    productStatistic: 0,
    supportStatistic: 0
  }
  public productSoldQuantityStatistic: {
    productId: number,
    productName: string,
    productActive: boolean,
    productSoldQuantity: number
  }[] = []
  public productFeedbackQuantityStatistic: {
    productId: number,
    productName: string,
    productActive: boolean,
    productFeedbackQuantity: number
  }[] = []
  private tempSubject: Subject<any> = new Subject()
  constructor(
    private messageService: NzMessageService,
    private statisticService: StatisticService,
    private authenticationStore: AuthenticationStore
  ) {}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }
  
  ngOnInit(): void {
    this.initAccount()
    this.initData()
  }

  initAccount(): void {
    this.tempSubject.subscribe({
      next: res => {
        this.isStaff = res.account && res.account.role === 1  
      },
      error: err => {
        this.messageService.error("Đã có lỗi xảy ra trong quá trình lấy dữ liệu")
        this.isStaff = true
      }
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }

  initData(): void {
    this.isLoading = true
    const observable1 = this.statisticService.get()
    const observable2 = this.statisticService.getByProductFeedbackQuantity()
    const observable3 = this.statisticService.getByProductSoldQuantity()

    forkJoin({
      ob1: observable1,
      ob2: observable2,
      ob3: observable3
    }).pipe(
      finalize(
        () => this.isLoading = false
      )
    ).subscribe({
      next: res => {
        if(res.ob1.status) this.statistic = res.ob1.data
        else this.messageService.error(res.ob1.message)

        if(res.ob2.status) this.productFeedbackQuantityStatistic = res.ob2.data
        else this.messageService.error(res.ob2.message)

        if(res.ob3.status) this.productSoldQuantityStatistic = res.ob3.data
        else this.messageService.error(res.ob3.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }


  
  timeChange(value: number): void {
    this.time = this.timeOptions[value]
  }

  typeChange(value: number): void {
    this.type = this.typeOptions[value]
  }
}
