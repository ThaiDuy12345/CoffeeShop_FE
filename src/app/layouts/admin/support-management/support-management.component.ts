import { Component } from '@angular/core';
import { Icon } from 'src/app/core/models/icon.model';
import { Support } from 'src/app/core/models/support.model';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-support-management',
  templateUrl: './support-management.component.html',
  styleUrls: ['./support-management.component.scss']
})
export class SupportManagementComponent {
  public icons: Icon = icons
  public detailVisible: boolean = false
  public inforVisible: boolean = false
  public isLoading: boolean = false
  public searchInput: string = ''
  public isDetailLoading: boolean = false
  public supports: Support[] = []


  constructor(
    private formatService: FormatService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  filterBySearch(): void {
    this.initData()
  }

  initData(): void {

  }
  
  formatDate(date: number): string {
    return this.formatService.formatTimeStamp(date)
  }

  onClickSubmitDeleteSupport(support: Support): void {

  }

  viewASupport(support: Support): void {}
}
