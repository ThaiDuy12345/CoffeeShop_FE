import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    
  ]
})
export class AppComponent implements OnInit {
  public isReady: Boolean = false
  public isDelay: Boolean = false
  constructor(
    private apiService: ApiService,
    private messageService: NzMessageService
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.isDelay = true
    }, 4000)
    this.apiService.isAlive().subscribe({
      next: (res) => {
        if(res.status === 200){
          this.isReady = true
        }
      },
      error: (err) => {
        this.messageService.error(err.message)
      }
    })
  }
}
