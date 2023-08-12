import { Component } from '@angular/core';
import { faUser, faBook, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public faUser = faUser
  public faBook = faBook
  public faArrowLeft = faArrowLeft
  public activeIndex: number = 0;
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
}
