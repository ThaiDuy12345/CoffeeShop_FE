import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Cookies from 'js-cookie';
import { Account } from 'src/app/core/models/account.model';
import { DetailOrder } from 'src/app/core/models/detail-order.model';
import { Order } from 'src/app/core/models/order.model';
import { AccountData, DetailOrderData, OrderData } from 'src/app/data/data';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  public current: number = 0 
  public order: Order = new Order()
  public detailOrders: DetailOrder[] = []
  public isLoading: boolean = false
  public user: Account = new Account()

  ngOnInit(): void {
    const userId = Cookies.get('id')
    const user = AccountData.find(item => item.id === userId)
    this.user = user ? user : new Account()
    this.activatedRoute.params.subscribe((params: any) => {
      if(params['id']) {
        console.log(params['id'])
        const order = OrderData.find(item => item.id === params['id'])
        if(order){
          this.order = order
          this.detailOrders = DetailOrderData.filter(item => item.order.id === this.order.id)
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}
}
