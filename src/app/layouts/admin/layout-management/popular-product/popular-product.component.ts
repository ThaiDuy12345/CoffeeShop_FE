import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.scss']
})
export class PopularProductComponent {
  public products: Product[] = ProductData
  public icons: Icon = icons
  public isLoading: boolean = false

  constructor(
    private messageService: NzMessageService
  ){}

  getPopularProductLength(): number {
    return this.products.filter(p => p.isPopular === true).length
  }

  confirmChange(productId: string, isPopular: boolean): void{
    this.isLoading = true
    const index = this.products.findIndex(product => product.id === productId)
    if(index !== -1){
      this.products[index].isPopular = isPopular
      this.messageService.success("Thay đổi trạng thái thành công")
    }else{
      this.messageService.error("Thay đổi trạng thái thất bại")
    }
    this.isLoading = false
  }

  priceSortOrdering(a: Product, b: Product): number {
    return a.price - b.price
  }

  isPopularFilter(isPopularFilter: boolean, item:Product): boolean {
    return item.isPopular === isPopularFilter
  }

}
