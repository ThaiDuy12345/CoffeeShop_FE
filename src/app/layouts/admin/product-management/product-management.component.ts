import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  public icons: Icon = icons
  public products: Product[] = []
  public detailVisible: boolean = false
  public choosingProduct: Product = new Product()
  public isLoading: boolean = false
  constructor(
    private messageService: NzMessageService,
    private formatService: FormatService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.productService.getAll().pipe(
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe({
      next: res => {
        if(res.status){
          this.products = res.data.map((p: any) => {
            return {
              id: p.productId,
              name: p.productName,
              description: p.productDescription,
              imageUrl: p.productImageUrl,
              creationDate: p.productCreationDate,
              isPopular: p.productIsPopular,
              category: {
                id: p.category.categoryId,
                name: p.category.categoryName
              },
              active: true
            }
          })
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.messsage)
      }
    })
  }

  confirmChange(productId: string, active: boolean): void{
    const index = this.products.findIndex(product => product.id === productId)
    if(index !== -1){
      this.isLoading = true
      this.productService.put(this.products[index].id, {
        productName: this.products[index].name,
        productCreationDate: this.products[index].creationDate,
        productDescription: this.products[index].description,
        productImageUrl: this.products[index].imageUrl,
        productActive: active,
        productIsPopular: this.products[index].isPopular,
        category: {
          categoryId: this.products[index].category.id,
          categoryName: this.products[index].category.name
        }
      }).pipe(finalize(() => {
        this.isLoading = false
      })).subscribe({
        next: (res: any) => {
          if(res.status){
            this.messageService.success("Thay đổi trạng thái thành công")
            this.products[index].active = res.data.productActive
          }else{
            this.messageService.error(res.message)
          }
        },
        error: (err: any) => {
          this.messageService.error(err.error.message)
        }
      })
    }else{
      this.messageService.error("Thay đổi trạng thái thất bại")
    }
  }

  formatDate(date: number): string {
    return this.formatService.formatDate(new Date(date))
  }

  viewAProduct(data: Product): void {
    if(!data) return
    this.choosingProduct = data
  }
}
