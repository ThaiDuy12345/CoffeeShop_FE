import { Component } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { icons } from 'src/app/shared/utils/icon.utils';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public activeIndex: number = 0;
  public icons = icons
  public isLoading: boolean = false
  public account: {
    email: string,
    password: string,
    name: string,
    address: string,
    phone: string
  } = {
    email: '',
    password: '',
    name: '',
    address: '',
    phone: ''
  }

  constructor(){}
}
