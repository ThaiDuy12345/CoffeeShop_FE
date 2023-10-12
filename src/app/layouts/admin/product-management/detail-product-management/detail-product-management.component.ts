import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FormatService } from 'src/app/core/services/format.service';
import { ProductData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';

@Component({
  selector: 'app-detail-product-management',
  templateUrl: './detail-product-management.component.html',
  styleUrls: ['./detail-product-management.component.scss']
})
export class DetailProductManagementComponent implements OnInit{
  public product: Product = new Product()
  public icons: Icon = icons
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

  timeSince(date: Date | string): string {
    if(date){
      return this.formatService.timeAgoSince(
        typeof date === "string" ? new Date(date) : date
      )
    }
    return this.formatService.timeAgoSince(new Date())
  }

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
}
