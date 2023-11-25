import { StatisticService } from './../../../core/services/statistic.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  public icons: Icon = icons
  public time: string = 'Tuần vừa qua'
  public type: string = 'Tài khoản được tạo'
  public timeOptions: string[] = ['Tuần vừa qua', 'Tháng vừa qua', '6 tháng vừa qua', 'Năm vừa qua'];
  public typeOptions: string[] = ['Tài khoản được tạo', 'Sản phẩm bán ra', 'Hoá đơn', 'Phản hồi', 'Thư hỗ trợ'];
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
  constructor(
    private messageService: NzMessageService,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.statisticService.get().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        if(res.status) this.statistic = res.data
        else this.messageService.error(res.message)
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
