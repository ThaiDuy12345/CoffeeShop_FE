import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = []
  @Input() isRelatedProductList: boolean = false
  public classes: string = ''
  ngOnInit(): void {
    if(this.isRelatedProductList){
      this.classes = `w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5`
    }else {
      this.classes = `w-full grid grid-cols-3 gap-5`
    }
  }

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(price);
  }
}






















