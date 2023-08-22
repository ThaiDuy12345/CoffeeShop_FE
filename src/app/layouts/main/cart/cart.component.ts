import { Component } from '@angular/core';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public icons: Icon = icons
}
