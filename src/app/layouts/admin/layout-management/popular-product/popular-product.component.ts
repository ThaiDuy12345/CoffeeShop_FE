import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.scss']
})
export class PopularProductComponent implements OnInit{
  public products: Product[] = []
  public icons: Icon = icons
  public isLoading: boolean = false
  public searchInput: string = ""

  constructor(
    private messageService: NzMessageService,
    private productService: ProductService,
    private formatService: FormatService,
    private mappingService: MappingService
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
          this.products = res.data.filter((p: any) => p.productActive).map((p: any) => this.mappingService.product(p))

          if(this.searchInput){
            this.products = this.products.filter(p => {
              return (
                p.category.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
                p.name.toLowerCase().includes(this.searchInput.toLowerCase())  ||
                this.formatDate(p.creationDate).toLowerCase().includes(this.searchInput.toLowerCase()) 
              )
            })
          }
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.messsage)
      }
    })
  }

  onSearchInput(): void {
    this.initData()
  }

  formatDate(date: number): string {
    return this.formatService.formatDate(new Date(date))
  }

  getPopularProductLength(): number {
    return this.products.filter(p => p.isPopular === true).length
  }

  confirmChange(productId: string, isPopular: boolean): void{
    const index = this.products.findIndex(product => product.id === productId)
    if(index !== -1){
      this.isLoading = true
      this.productService.put(this.products[index].id, {
        productName: this.products[index].name,
        productCreationDate: this.products[index].creationDate,
        productDescription: this.products[index].description,
        productImageUrl: this.products[index].imageUrl,
        productActive: this.products[index].active,
        productIsPopular: isPopular,
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
            this.products[index].isPopular = res.data.productIsPopular
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

  isPopularFilter(isPopularFilter: boolean, item:Product): boolean {
    return item.isPopular === isPopularFilter
  }

}
