import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Feedback } from 'src/app/core/models/feedback.model';
import { Icon } from 'src/app/core/models/icon.model';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrl: './feedback-management.component.scss'
})
export class FeedbackManagementComponent {
  public icons: Icon = icons
  public detailVisible: boolean = false
  public inforVisible: boolean = false
  public isLoading: boolean = false
  public searchInput: string = ''
  public isDetailLoading: boolean = false
  public feedbacks: Feedback[] = []
  public choosingFeedback: Feedback = new Feedback()


  constructor(
    private formatService: FormatService,
    private mappingService: MappingService,
    private feedbackService: FeedbackService,
    private messageService: NzMessageService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  filterBySearch(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.feedbackService.getAll().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        this.feedbacks = res.data.map((s: any) => this.mappingService.feedback(s))
        if(this.searchInput) this.feedbacks = this.feedbacks.filter(s => {
          return (
            s.account.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            s.product.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            this.formatService.formatTimeStamp(s.creationDate).toLowerCase().includes(this.searchInput.toLowerCase()) 
          )
        })
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  renderStarColor(star: number): string {
    switch (true) {
      case star === 0:
        return 'rgb(121, 125, 133)';
      default:
        return '#FADB14'
    }
  }
  
  onClickSubmitDeleteFeedback(feedback: Feedback): void {
    this.feedbackService.delete({ accountPhone: feedback.account.phone, productId: feedback.product.id }).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Xóa thư hỗ trợ thành công")
          this.initData()
        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  viewAFeedback(feedback: Feedback): void {
    this.choosingFeedback = {...feedback}
  }

  confirmChange(active: boolean): void {
    this.feedbackService.put({
      feedbackId: {
        accountPhone: this.choosingFeedback.account.phone,
        productId: this.choosingFeedback.product.id
      },
      feedbackActive: active,
      feedbackRate: this.choosingFeedback.rate,
      feedbackComment: this.choosingFeedback.comment
    }).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Cập nhật trạng thái thành công")
          this.choosingFeedback.active = res.data.feedbackActive
          const index = this.feedbacks.findIndex(s => 
            s.account.phone === this.choosingFeedback.account.phone
            &&
            s.product.id === this.choosingFeedback.product.id
          )
          if(index !== -1) this.feedbacks[index].active = res.data.feedbackActive

        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  activeFilter(activeFilter: Boolean[], item: Feedback): boolean {
    return activeFilter.includes(item.active)
  }

  rateFilter(rateFilter: number[], item: Feedback): boolean {
    return rateFilter.includes(item.rate)
  }

  rateSort(a: Feedback, b: Feedback): number {
    return a.rate - b.rate
  }

  dateSort(a: Feedback, b: Feedback): number {
    return new Date(a.creationDate) > new Date(b.creationDate) ? 1 : -1
  }
}
