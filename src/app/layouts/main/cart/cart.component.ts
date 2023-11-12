import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { Icon } from 'src/app/core/models/icon.model';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy{
  public icons: Icon = icons
  public selectedTab: number = 0
  public account: Account = new Account()
  public tempSubject: Subject<any> = new Subject()
  public isLoading: boolean = false
  constructor(
    private activateRoute: ActivatedRoute,
    private authenticationStore: AuthenticationStore,
    private router: Router,
    private messageService: NzMessageService
  ){}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.isLoading = true
    this.activateRoute.queryParams.subscribe(params => {
      if(params['tab'] === 'HISTORY_ORDER'){
        this.selectedTab = 1
      }else {
        this.selectedTab = 0
      }
    })

    this.tempSubject.subscribe({
      next: res => {
        if(res.account && res.account.phone){
          this.account = res.account
          this.isLoading = false
        }else{
          this.router.navigateByUrl('/sign-in')
          this.messageService.error("Không thể lấy được thông tin người dùng")
        }
      },
      error: err => this.messageService.error(err.error.message)
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }
}
