import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbIconLibraries } from '@nebular/theme';
import Cookies from 'js-cookie';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public activeIndex: number = 0;
  public icons = icons
  public isLoading: boolean = false
  public account: {
    email: string,
    password: string,
    name: string,
    phone: string
  } = {
    email: '',
    password: '',
    name: '',
    phone: ''
  }

  ngOnInit(): void {
    Cookies.get('id') && this.router.navigate(['/main/dashboard'])
  }

  constructor(
    private router: Router
  ){}

  changeTab(index: number): void {
    
  }

  isEmailValidate(): Boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.account.email)
  }

  isPasswordValidate(): Boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(this.account.password)
  }
}
