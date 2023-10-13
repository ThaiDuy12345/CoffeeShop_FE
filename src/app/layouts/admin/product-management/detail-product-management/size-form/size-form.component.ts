import { Component, Input, OnInit } from '@angular/core';
import { Icon } from 'src/app/core/models/icon.model';
import { ProductSize } from 'src/app/core/models/product-size.model';
import { Product } from 'src/app/core/models/product.model';
import { ProductSizeData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss']
})
export class SizeFormComponent implements OnInit{
  @Input() product: Product = new Product();
  public currentEditItem: number = -1
  public editItem: ProductSize = new ProductSize()
  public icons: Icon = icons
  public productSizes: ProductSize[] = [];

  ngOnInit(): void {
    this.productSizes = ProductSizeData.filter(ps => ps.product.id === this.product.id)
  }

  onClickCancel(): void {
    this.currentEditItem = -1
    this.editItem = new ProductSize()
  }
}
