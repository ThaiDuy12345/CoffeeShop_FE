import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { ProductSize } from 'src/app/core/models/product-size.model';
import { Product } from 'src/app/core/models/product.model';
import { MappingService } from 'src/app/core/services/mapping.service';
import { ProductSizeService } from 'src/app/core/services/product-size.service';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrl: './size-form.component.scss'
})
export class SizeFormComponent implements OnInit{
  @Input() product: Product = new Product();
  public currentEditItem: number = -1
  public editItem: ProductSize = new ProductSize()
  public icons: Icon = icons
  public productSizes: ProductSize[] = [];
  public isLoading: boolean = false 
  public isNew: boolean = false
  public isLoadingSubmitSizeButton: boolean = false
  public isLoadingDeleteSizeButton: boolean = false

  public sizeOptions: { value: string, text: string }[] = [
    { value: "S", text: "Size nhỏ (S)" },
    { value: "M", text: "Size vừa (M)" },
    { value: "L", text: "Size nhỏ (L)" },
  ]

  constructor(
    private messageService: NzMessageService,
    private productSizeService: ProductSizeService,
    private mappingService: MappingService
  ) {}

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.isLoading = true
    this.productSizeService.getByProductId({ productId: this.product.id }).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        if(res.status) this.loadSizeData(res.data)
        else{
          this.messageService.error(res.message)
        }
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  loadSizeData(data: any): void {
    this.productSizes = data.map((ps: any) => this.mappingService.productSize(ps))
  }

  onClickCancel(): void {
    this.currentEditItem = -1
    this.editItem = new ProductSize()
  }

  onSaveEditItem(): void {
    if(
      !this.editItem.size ||
      !this.editItem.price
    ){
      this.messageService.error("Bạn cần điền hết thông tin để tiếp tục!!")
      return
    }
    this.isLoadingSubmitSizeButton = true

    const observable: Observable<any> = this.isNew ? 
      this.productSizeService.post(this.product.id, {
        productSize: this.editItem.size,
        productSizePrice: this.editItem.price,
      })
    :
      this.productSizeService.put(this.editItem.id, {
        productSize: this.editItem.size,
        productSizePrice: this.editItem.price,
      })

    observable.pipe(
      finalize(() => {
        this.isLoadingSubmitSizeButton = false
        if(this.isNew) this.isNew = false
      })
    ).subscribe({
      next: res => {
        if(res.status) {
          this.messageService.success("Thao tác thành công!!")
          const newArr = this.productSizes
          newArr[this.currentEditItem] =  {
            id: res.data.productSizeId,
            size: res.data.productSize,
            price: res.data.productSizePrice,
            product: new Product()
          }
          
          this.productSizes = [...newArr]
          this.onClickCancel()

        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  onConfirmDelete(sizeId: string): void {
    this.productSizeService.delete({ productSizeId: sizeId }).pipe(
      finalize(() => {
        this.isLoadingDeleteSizeButton = false
      })
    ).subscribe({
      next: res => {
        if(res.status) {
          this.messageService.success("Xoá kích thước thành công!!")
          this.productSizes = this.productSizes.filter(ps => ps.id !== sizeId)
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  loadSizeOptionData(): void {
    const newArray : { value: string, text: string }[] = []
    this.sizeOptions = [
      { value: "S", text: "Size nhỏ (S)" },
      { value: "M", text: "Size vừa (M)" },
      { value: "L", text: "Size lớn (L)" },
    ]

    if(this.isNew === false){
      this.sizeOptions.forEach(so => {
        const res = this.productSizes.find(ps => ps.size === so.value && ps.id)
        if(!res || res.id === this.productSizes[this.currentEditItem].id) newArray.push(so)
      })
    }else{
      this.sizeOptions.forEach(so => {
        const res = this.productSizes.find(ps => ps.size === so.value && ps.id)
        if(!res) newArray.push(so)
      })
    }

    this.sizeOptions = [...newArray]
  }

  onClickEditProductSize(size: ProductSize, index: number): void {
    this.currentEditItem = index;
    this.editItem = {...size}; 
    this.loadSizeOptionData()
  }

  onClickAddNewProductSize(): void {
    this.editItem =  new ProductSize()
    this.productSizes = [
      ...this.productSizes,
      this.editItem
    ]
    this.currentEditItem = this.productSizes.length - 1
    this.isNew = true
    this.loadSizeOptionData()
  }

  onClickCancelEditProductSize(): void {
    this.currentEditItem = -1
    this.editItem = new ProductSize()
    if(this.isNew){
      const arr = [...this.productSizes]
      arr.pop()
      this.productSizes = [...arr]
      this.isNew = false
    }
  }
}
