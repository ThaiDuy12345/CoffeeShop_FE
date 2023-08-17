import { Component } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public mostPopularProducts: Product[] = ProductData
  public array = [1, 2, 3, 4];
}






