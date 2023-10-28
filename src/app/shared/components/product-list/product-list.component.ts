import { Observable, finalize } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: Product[] = []
  @Input() isRelatedProductList: boolean = false
  @Input() cols: number = 3
  @Input() view: 'ICON' | 'LIST' = 'ICON'
  public images: string[] = []
  public classes: string = ''

  constructor(
    private formatService: FormatService,
    private imageService: ImageService,
    private messageService: NzMessageService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cols']){
      if(this.isRelatedProductList) return
      this.classes = `w-full grid grid-cols-${this.cols} gap-5`
    }
  }

  ngOnInit(): void {
    this.initImageData()
    if(this.isRelatedProductList){
      this.classes = `w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5`
    }else {
      this.classes = `w-full grid grid-cols-${this.cols} gap-5`
    }
  }

  initImageData(): void {
    console.log("something 2")
    this.products.forEach((p) => {
      this.getImage(p.imageUrl).subscribe({
        next: res => {
          this.images.push(res)
        },
      })
    })
  }

  getImage(url: string): Observable<any> {
    console.log("something 1")
    return new Observable((observer) => this.imageService.getById({ imageId: url }).pipe(
      finalize(() => observer.complete())
    ).subscribe({
      next: res => {
        if(res.status === 200){
          observer.next(res.data.url)
        }else{
          this.messageService.error("Lỗi không thể tải ảnh sản phẩm")
          observer.next('')
        }
      },
      error: err => {
        this.messageService.error("Lỗi không thể tải ảnh sản phẩm")
        observer.next('')
      }
    }))
  }

  getPrice(productId: string): number {
    return 50000
  }

  formatPrice(price: number): string {
    return this.formatService.formatPrice(price)
  }
}






















