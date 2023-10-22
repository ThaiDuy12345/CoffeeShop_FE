import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormatService } from 'src/app/core/services/format.service';
import { icons } from '../../../shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { Subject } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit, OnDestroy {
  public selectedItem: '0' | '1' | '2' = '0'
  public title: string = "ĐƠN GÓP Ý TỚI COFFEE"
  public icons: Icon = icons
  public name: string = ''
  public isLoading: boolean = false
  public content: string = ""
  public isSent: boolean = false
  public tempSubject: Subject<any> = new Subject()
  public account: Account = new Account()
  
  constructor(
    private formatService: FormatService,
    private authenticationStore: AuthenticationStore
  ){}

  ngOnDestroy(): void {
    
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
