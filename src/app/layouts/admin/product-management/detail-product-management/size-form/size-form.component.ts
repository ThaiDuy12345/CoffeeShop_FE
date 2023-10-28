import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  constructor(
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.productSizes = ProductSizeData.filter(ps => ps.product.id === "5")
  }

  onClickCancel(): void {
    this.currentEditItem = -1
    this.editItem = new ProductSize()
  }

  onSaveEditItem(): void {
    this.productSizes[this.currentEditItem] = this.editItem
    this.messageService.success("Chỉnh sửa size thành công")

    this.onClickCancel()
  }

  onConfirmDelete(sizeId: string): void {
    delete this.productSizes[this.productSizes.findIndex(ps => ps.id === sizeId)]
    this.messageService.success("Xóa size thành công")

  }
}
