import { StatisticService } from './../../../core/services/statistic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize, forkJoin, map } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Statistic } from 'src/app/core/models/statistic.model';
import { MappingService } from 'src/app/core/services/mapping.service';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy{
  public icons: Icon = icons
  public time: number = 0
  public type: number = 0
  public timeValue: 'week' | 'month' | 'halfYear' | 'year' = 'week'
  public typeValue: 'product' | 'ordering' | 'feedback' | 'support' = 'product'
  public timeOptions: string[] = ['Tuần vừa qua', 'Tháng vừa qua', '6 tháng vừa qua', 'Năm vừa qua'];
  public typeOptions: string[] = ['Sản phẩm bán ra', 'Hoá đơn', 'Phản hồi', 'Thư hỗ trợ'];
  public chartType: 'stepline' | 'straight' | 'smooth' = 'smooth'
  public chartOptions: { text: string, value: string}[] = [
    { text: 'Đường cong', value: 'smooth' },
    { text: 'Đường thẳng', value: 'straight' },
    { text: 'Đường bậc', value: 'stepline' }
  ]
  public isStaff: boolean = false
  public isLoadingStatistic: boolean = false
  public isLoading: boolean = false
  public statistic: [number, number][] = []
  public quickViewStatistic: {
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
    private authenticationStore: AuthenticationStore,
    private mappingService: MappingService
  ) {}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }
  
  ngOnInit(): void {
    this.initAccount()
    this.initData()
    this.initStatistic()
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
        if(res.ob1.status) this.quickViewStatistic = res.ob1.data
        else this.messageService.error(res.ob1.message)

        if(res.ob2.status) this.productFeedbackQuantityStatistic = res.ob2.data
        else this.messageService.error(res.ob2.message)

        if(res.ob3.status) this.productSoldQuantityStatistic = res.ob3.data
        else this.messageService.error(res.ob3.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  initStatistic(): void {
    this.isLoadingStatistic = true
    this.statisticService.getStatisticChart({ dateType: this.timeValue, type: this.typeValue }).pipe(
      finalize(() => this.isLoadingStatistic = false)
    ).subscribe({
      next: res => {
        if(res.status) this.statistic = this.mappingService.statistic(res.data, this.timeValue, this.typeValue)
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  choosingTypeChange(chartValue: 'stepline' | 'straight' | 'smooth'): void {
    this.chartType = chartValue
  }
  
  timeChange(value: number): void {
    //create a switch case for value variable. If value = 0 then this.timeValue = 'week', 1 then 'month', if then keep going for 'halfYear' and 'year'
    switch(value) {
      case 0: {
        this.timeValue = 'week'
        break
      }
      case 1: {
        this.timeValue = 'month'
        break
      }
      case 2: {
        this.timeValue = 'halfYear'
        break
      }
      case 3: {
        this.timeValue = 'year'
        break
      }
    }
    this.initStatistic()
  }

  typeChange(value: number): void {
    switch(value) {
      case 0: {
        this.typeValue = 'product'
        break
      }
      case 1: {
        this.typeValue = 'ordering'
        break
      }
      case 2: {
        this.typeValue = 'feedback'
        break
      }
      case 3: {
        this.typeValue = 'support'
        break
      }
    }
    this.initStatistic()
  }  
}
