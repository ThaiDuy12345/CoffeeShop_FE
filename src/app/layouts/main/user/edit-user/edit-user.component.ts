import { Component, Input  } from '@angular/core';
import { Account } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  @Input() user: Account = new Account()
}
