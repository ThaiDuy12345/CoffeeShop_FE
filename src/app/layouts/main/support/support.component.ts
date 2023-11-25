import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from '../../../shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { Subject, finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { SupportService } from 'src/app/core/services/support.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit, OnDestroy {
  public selectedItem: 0 | 1 | 2 | 3 = 0
  public title: string = "ĐƠN GÓP Ý TỚI COFFEE"
  public icons: Icon = icons
  public name: string = ''
  public isLoading: boolean = false
  public content: string = ""
  public isSent: boolean = false
  public tempSubject: Subject<any> = new Subject()
  public account: Account = new Account()
  public reasons: { value: number, text: string }[] = [
    {
      text: "Đề xuất để giúp COFFEE cải thiện dịch vụ",
      value: 0
    },
    {
      text: "Báo lỗi trong quá trình sử dụng dịch vụ",
      value: 1
    },
    {
      text: "Khiếu nại về 1 vấn đề",
      value: 2
    },
    {
      text: "Khác",
      value: 3
    }
  ]
  
  constructor(
    private formatService: FormatService,
    private authenticationStore: AuthenticationStore,
    private supportService: SupportService,
    private messageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
  ){
    this.activatedRoute.queryParams.subscribe(params => {
      if(!params['title']) return
      this.title = params['title']
    })
  }

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.tempSubject.subscribe({
      next: (res) => {
        this.account = res.account 
      }
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }

  formatDate(date: Date = new Date()): string {
    return this.formatService.formatDate(date)
  }

  send(): void {
    if(
      !this.title ||
      !this.content
    ){
      this.messageService.error("Xin vui lòng điền hết tất cả chỗ trống để tiếp tục")
    }
    this.isLoading = true
    this.supportService.post({
      accountEntity: {
        accountPhone: this.account.phone
      },
      supportTitle: this.title,
      supportContent: this.content,
      supportReason: this.reasons.find(p => p.value === this.selectedItem)?.text
    }).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        this.reset();
        this.isSent = true
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  reset(): void {
    this.selectedItem = 0
    this.title = "ĐƠN GÓP Ý TỚI COFFEE"
    this.content = ""
    this.isSent = false
  }
}
