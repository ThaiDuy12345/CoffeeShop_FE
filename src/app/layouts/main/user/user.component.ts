import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { Account } from 'src/app/core/models/account.model';
import { AccountData } from 'src/app/data/data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  public isEdit: Boolean = false
  public user: Account = new Account()
  public selectedTab: 'INFORMATION_TAB' | 'CHANGE_PASSWORD_TAB' = 'INFORMATION_TAB'
  constructor(
    private router: Router
  ){}

  ngOnInit() {
    const id = Cookies.get('id')
    if(!id){
      this.router.navigate(['/sign-in'])
      return
    }
    const user = AccountData.find(item => item.id === id)
    if(user){
      this.user = user
      return 
    }
    this.router.navigate(['/sign-in'])
  }
}
