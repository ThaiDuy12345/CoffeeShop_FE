import { Component, OnInit, isDevMode } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from './core/models/icon.model';
import { icons } from './shared/utils/icon.utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public isReady: Boolean = false
  public isDelay: Boolean = false
  public failToLoad: Boolean = false
  public icons: Icon = icons
  constructor(
    private apiService: ApiService,
    private messageService: NzMessageService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    setTimeout(() => this.isDelay = true, 4000)
    this.apiService.isAlive().subscribe({
      next: (res) => {
        if(res === true) this.isReady = true
        else this.failToLoad = true
      },
      error: (err) => this.messageService.error(err.message)
    })
  }
}
