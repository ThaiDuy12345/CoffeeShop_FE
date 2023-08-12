import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public account: { email: string, password: string } = {
    email: '',
    password: ''
  }
  
  public isSubmitted: Boolean = false

  constructor(
    private messageService: MessageService,
  ){}

  onClickSignIn(): void {
    this.isSubmitted = true
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Message Content' 
    })
    console.log("sign in")
  }
}
