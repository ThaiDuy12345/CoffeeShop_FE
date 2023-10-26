import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';

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
