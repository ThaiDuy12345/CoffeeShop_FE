import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Cookies from 'js-cookie';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Icon } from 'src/app/core/models/icon.model';
import { Ordering } from 'src/app/core/models/ordering.model';
import { AccountData, DetailOrderData, OrderingData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.scss']
})
export class OrderingComponent implements OnInit{
  public icons: Icon = icons
  public current: number = 0 
  public ordering: Ordering = new Ordering()
  public detailOrders: DetailOrder[] = []
  public isLoading: boolean = false
  public user: Account = new Account()

  ngOnInit(): void {
    const userId = Cookies.get('id')
    const user = AccountData.find(item => item.phone === userId)
    this.user = user ? user : new Account()
    this.activatedRoute.params.subscribe((params: any) => {
      if(params['id']) {
        const ordering = OrderingData.find(item => item.id === params['id'])
        if(ordering){
          this.ordering = ordering
          this.detailOrders = DetailOrderData.filter(item => item.ordering.id === this.ordering.id)
          return
        }
      }
      this.router.navigate(['/main/dashboard'])
    })
    
  }
  
  onClickNextStep(newStep: number): void {
    this.isLoading = true
    setTimeout(() => {
      this.current = newStep
      this.isLoading = false
    }, 1500)
  }

  getWidth(): number {
    return window.innerWidth
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}
}
