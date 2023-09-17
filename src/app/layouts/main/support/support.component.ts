import { Component } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from '../../../shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  public selectedItem: '0' | '1' | '2' = '0'
  public title: string = "ĐƠN GÓP Ý TỚI COFFEE"
  public icons: Icon = icons
  public name: string = ''
  public isLoading: boolean = false
  public content: string = ""
  public isSent: boolean = false
  constructor(
    private formatService: FormatService,
    private messageService: NzMessageService 
  ){}

  formatDate(date: Date = new Date()): string {
    return this.formatService.formatDate(date)
  }

  send(): void {
    this.isLoading = true
    setTimeout(() => {
      this.isSent = true
      this.isLoading = false
    }, 2000)
  }

  reset(): void {
    this.selectedItem = '0'
    this.title = "ĐƠN GÓP Ý TỚI COFFEE"
    this.name = ''
    this.content = ""
    this.isSent = false
  }
}
