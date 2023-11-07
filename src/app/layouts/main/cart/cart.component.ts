import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  public icons: Icon = icons
  public selectedTab: number = 0
  constructor(
    private activateRoute: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      if(params['tab'] === 'HISTORY_ORDER'){
        this.selectedTab = 1
      }else {
        this.selectedTab = 0
      }
    })
  }
}
