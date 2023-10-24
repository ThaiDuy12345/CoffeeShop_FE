import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { ProductData, ProductSizeData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-detail-product-management',
  templateUrl: './detail-product-management.component.html',
  styleUrls: ['./detail-product-management.component.scss']
})
export class DetailProductManagementComponent implements OnInit{
  public product: Product = new Product()
  public icons: Icon = icons
  public onEditMode: Boolean = false
  constructor(
    private messageService: NzMessageService,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>,
    private formatService: FormatService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
      if(!id) return
      const result = ProductData.find(p => p.id === id)
      if(result) this.product = result
    })
  }

  formatDate(date: Date | string): string {
    if(date){
      return this.formatService.formatDate(
        typeof date === "string" ? new Date(date) : date
      )
    }
    return this.formatService.formatDate(new Date())
  }

  handleInputChange(fileList: FileList | null): void {
    if(fileList === null) return
    const file: File = fileList[0]
    const r = new FileReader()
    r.onload = (e) => {
      if(e && e.target && e.target.result && e.target.result instanceof ArrayBuffer) {
        
        this.product.imageUrl = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(e.target.result)
      }
    }
    r.readAsArrayBuffer(file)
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

  timeSince(date: Date | string): string {
    if(date){
      return this.formatService.timeAgoSince(
        typeof date === "string" ? new Date(date) : date
      )
    }
    return this.formatService.timeAgoSince(new Date())
  }

  getBase64 (file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  isAtMaxSize(): boolean {
    return ProductSizeData.filter(ps => ps.product.id === this.product.id).length === 3
  }
}
