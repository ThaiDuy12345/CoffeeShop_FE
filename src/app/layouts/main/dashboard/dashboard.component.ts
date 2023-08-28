import { FilterStore } from './../../../core/stores/filter.store';
import { Component } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public mostPopularProducts: Product[] = ProductData

  constructor(
    private filterStore: FilterStore,
    private router: Router
  ){}

  onSearch(productName: string): void {
    this.filterStore.update(() => {
      return {
        search: productName,
        category: []
      }
    })
    this.router.navigate(['/main/product'])
  }
}






