import { Component, OnDestroy, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { Subject } from 'rxjs';
import { AccountService } from '../core/services/account.service';
import { AuthenticationStore } from '../core/stores/authentication.store';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent implements OnInit, OnDestroy{
  private tempSubject: Subject<any> = new Subject<any>();

  constructor(
    private accountService: AccountService,
    private authenticationStore: AuthenticationStore,
    private authenService: AuthService
  ){
  }

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.tempSubject.subscribe({
      next: (state) => {
        const id = Cookies.get('id')
        if(!(state.account.phone) && id){
          this.accountService.getByPhone({ accountPhone: id }).subscribe({
            next: (res) => {
              res.status ? this.authenService.saveAccountToStore(res.data) : Cookies.remove('id')
            },
            error: (err) => {
              console.log(err)
              Cookies.remove('id')
            }
          })
        }
      }
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }
}
