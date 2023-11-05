import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, finalize } from 'rxjs';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { ImageService } from 'src/app/core/services/image.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductSizeData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-detail-product-management',
  templateUrl: './detail-product-management.component.html',
  styleUrls: ['./detail-product-management.component.scss']
})
export class DetailProductManagementComponent implements OnInit{
  public product: Product = new Product()
  public icons: Icon = icons
  public onEditMode: boolean = false
  public isLoading: boolean = false
  public isLoadingSubmitButton: boolean = false
  public isUploadNewImage: boolean = false
  public isUploadingNewImage: boolean = false
  public isUploadingSaveButton: boolean = false
  public imageFile?: File = undefined
  public inputFile: string = ""
  public isNew: boolean = false
  public editProduct: Product = new Product()
  constructor(
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>,
    private productService: ProductService,
    private imageService: ImageService,
    private mappingService: MappingService
  ){}

  ngOnInit(): void {
    this.initProduct()
  }

  initProduct(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
      if(!id) {
        this.isNew = true
        this.onEditMode = true
        return
      }
      this.isLoading = true
      this.productService.getById({ productId: id }).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: res => res.status ? this.reloadProductData(res.data) : this.messageService.error(res.message),
        error: err => {
          this.messageService.error(err.error.message)
        }
      })
    })
  }

  handleInputChange(fileList: FileList | null): void {
    if(fileList === null) return
    const file: File = fileList[0]
    const r = new FileReader()
    r.onload = (e) => {
      if(e && e.target && e.target.result && e.target.result instanceof ArrayBuffer) {
        this.editProduct.imageUrl = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(e.target.result)
        this.isUploadNewImage = true
        this.imageFile = file
      }else{
        this.messageService.error("Đã có lỗi trong việc tải ảnh mới!! xin hãy thử lại")
      }
    }
    r.readAsArrayBuffer(file)
  }

  onCancelEditMode(): void {
    if(this.isNew){
      this.editProduct = new Product()
      this.product = new Product()
      this.router.navigateByUrl('/admin/product-management')
      this.isNew = false
    }else{
      this.editProduct = { ...this.product }
    }
    this.onEditMode = false
  }

  reloadProductData(data: any): void {
    this.product = this.mappingService.product(data)
    this.editProduct = { ...this.product }
  }

  onClickCancelUploadImage() {
    this.editProduct.imageUrl = this.product.imageUrl
    this.isUploadNewImage = false
    this.inputFile = ""
  }

  onConfirmUploadImage() {
    if(!this.imageFile){
      this.messageService.error("Ảnh đã bị lỗi, xin vui lòng tải lại")
      this.onClickCancelUploadImage()
      return
    }
    this.isUploadingNewImage = true
    const formData = new FormData()
    formData.append('file', this.imageFile)
    this.imageService.addNewImage({ productId: this.product.id, formData: formData }).pipe(
      finalize(() => {
        this.isUploadingNewImage = false
        this.isUploadNewImage = false
        this.inputFile = ""
      })
    ).subscribe({
      next: res => {
        if(res.status === true){
          this.productService.put(this.product.id, {
            productName: this.product.name,
            productCreationDate: this.product.creationDate,
            productDescription: this.product.description,
            productImageUrl: res.data.url,
            productActive: this.product.active,
            productIsPopular: this.product.isPopular,
            category: {
              categoryId: this.product.category.id,
              categoryName: this.product.category.name
            }
          }).subscribe({
            next: res2 => {
              if(res2.status){
                this.messageService.success("Tải ảnh mới lên thành công")
                this.product.imageUrl && this.imageService.delete({ imageId: this.product.imageUrl }).subscribe()
                this.reloadProductData(res2.data)
              }else{
                this.messageService.error(res2.message)
              }
            },
            error: err2 => {
              this.messageService.error(err2.error.message)
            }
          })
        }else{
          this.messageService.error("Ảnh tải lên server thất bại")
        }
      },
      error: err => {
        this.messageService.error("Ảnh tải lên server thất bại")
      }
    })
  }

  open(dialog: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(dialog, {
      context: 'Bạn có muốn xác nhận đổi thông tin?',
    });
  }

  onSubmitConfirm(): void {
    if(
      !this.editProduct.category.id ||
      !this.editProduct.name || 
      !this.editProduct.description
    ){
      this.messageService.error("Bạn cần điền hết thông tin để tiếp tục!!")
      this.dialogRef.close()
      return
    }
    this.isLoadingSubmitButton = true

    const observable: Observable<any> = this.isNew ? 
      this.productService.post({
        productName: this.editProduct.name,
        productDescription: this.editProduct.description,
        productImageUrl: "",
        productActive: false,
        productIsPopular: false,
        category: {
          categoryId: this.editProduct.category.id,
          categoryName: this.editProduct.category.name
        }
      })
    :
      this.productService.put(this.product.id, {
        productName: this.editProduct.name,
        productDescription: this.editProduct.description,
        productImageUrl: this.product.imageUrl,
        productActive: this.product.active,
        productIsPopular: this.product.isPopular,
        category: {
          categoryId: this.editProduct.category.id,
          categoryName: this.editProduct.category.name
        }
      })
    
    observable.pipe(
      finalize(() => {
        this.isLoadingSubmitButton = false
        this.dialogRef.close()
      })
    ).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Thao tác thành công")
          this.onEditMode = false
          this.isNew ? 
            this.router.navigateByUrl(`/admin/product-management/${res.data.productId}`) 
              : 
            this.reloadProductData(res.data)
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    // Chuyển đổi ArrayBuffer thành dạng Base64
    const binary = new Uint8Array(buffer);
    const binaryArray = Array.from(binary);
    let binaryString = '';
    for (let i = 0; i < binaryArray.length; i++) {
      binaryString += String.fromCharCode(binaryArray[i]);
    }
    return btoa(binaryString);
  }

  getBase64 (file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }
}
