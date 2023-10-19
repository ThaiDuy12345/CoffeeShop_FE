import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { AccountData } from 'src/app/data/data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy{
  public isEdit: Boolean = false
  public user: Account = new Account()
  public selectedTab: 'INFORMATION_TAB' | 'CHANGE_PASSWORD_TAB' = 'INFORMATION_TAB'
  private tempSubject: Subject<any> = new Subject()
  constructor(
    private authenticationStore: AuthenticationStore
  ){}

  ngOnDestroy(){
    this.tempSubject.complete()
  }

  ngOnInit() {
    this.tempSubject.subscribe({
      next: (state) => this.user = state.account
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }
}
