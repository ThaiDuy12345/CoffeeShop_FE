import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { ProductData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {
  public icons: Icon = icons
  public products: Product[] = ProductData

  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService
  ){}

  confirmChange(productId: string, status: boolean): void{
    const index = this.products.findIndex(product => product.id === productId)
    if(index !== -1){
      this.products[index].status = status
      this.messageService.success("Thay đổi trạng thái thành công")
    }else{
      this.messageService.error("Thay đổi trạng thái thất bại")
    }
  }

  formatDate(date: Date | string): string {
    if(date){
      return this.formatService.formatDate(
        typeof date === "string" ? new Date(date) : date
      )
    }
    return this.formatService.formatDate(new Date())
  }
}