import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Support } from 'src/app/core/models/support.model';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { SupportService } from 'src/app/core/services/support.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-support-management',
  templateUrl: './support-management.component.html',
  styleUrl: './support-management.component.scss'
})
export class SupportManagementComponent {
  public icons: Icon = icons
  public detailVisible: boolean = false
  public inforVisible: boolean = false
  public isLoading: boolean = false
  public searchInput: string = ''
  public isDetailLoading: boolean = false
  public supports: Support[] = []
  public choosingSupport: Support = new Support()


  constructor(
    private formatService: FormatService,
    private supportService: SupportService,
    private mappingService: MappingService,
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
    this.supportService.getAll().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        this.supports = res.data.map((s: any) => this.mappingService.support(s))
        if(this.searchInput) this.supports = this.supports.filter(s => {
          return (
            s.id.toString().includes(this.searchInput.toLowerCase()) ||
            s.account.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            this.formatService.formatTimeStamp(s.creationDate).toLowerCase().includes(this.searchInput.toLowerCase()) ||
            s.reason.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            s.title.toLowerCase().includes(this.searchInput.toLowerCase())
          )
        })
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  onClickSubmitDeleteSupport(supportId: string): void {
    this.supportService.delete({ supportId: supportId }).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Xóa thư hỗ trợ thành công")
          this.initData()
        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  viewASupport(support: Support): void {
    this.choosingSupport = {...support}
  }

  confirmChange(): void {
    this.supportService.put({ supportId: this.choosingSupport.id, payload: {
      supportStatus: true
    }}).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Cập nhật trạng thái thành công")
          this.choosingSupport.status = res.data.supportStatus
          const index = this.supports.findIndex(s => s.id === this.choosingSupport.id)
          if(index !== -1) this.supports[index].status = res.data.supportStatus

        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  statusFilter(statusFilter: Boolean[], item: Support): boolean {
    return statusFilter.includes(item.status)
  }

  dateSort(a: Support, b: Support): number {
    return new Date(a.creationDate) > new Date(b.creationDate) ? 1 : -1
  }
}
