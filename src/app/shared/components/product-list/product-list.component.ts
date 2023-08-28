import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: Product[] = []
  @Input() isRelatedProductList: boolean = false
  @Input() cols: number = 3
  public classes: string = ''

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cols']){
      if(this.isRelatedProductList) return
      this.classes = `w-full grid grid-cols-${this.cols} gap-5`
    }
  }

  ngOnInit(): void {
    if(this.isRelatedProductList){
      this.classes = `w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5`
    }else {
      this.classes = `w-full grid grid-cols-${this.cols} gap-5`
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






















