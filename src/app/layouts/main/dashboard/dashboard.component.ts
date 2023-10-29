import { FilterStore } from './../../../core/stores/filter.store';
import { Component, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { Router } from '@angular/router';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { BannerService } from 'src/app/core/services/banner.service';
import { ProductService } from 'src/app/core/services/product.service';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public mostPopularProducts: Product[] = []
  public bannerPopup: string = ""
  public bannerMain: string = ""
  public bannerMainReplace: string = ""
  public bannerPopupReplace: string = ""
  public icons: Icon = icons
  public isLoading: boolean = false
  @ViewChild('dialog', { static: true }) public myTemplate!: TemplateRef<any>
  
  constructor(
    private filterStore: FilterStore,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
    private bannerService: BannerService,
    private productService: ProductService,
    private messageService: NzMessageService
  ){}
  
  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    try{
      this.bannerService.getMainBanner().subscribe(responses => {
        if(responses.status === true) {
          this.bannerMain = responses.data.url
        }else{
          this.bannerMainReplace = "assets/brand-icons/banner.jpg"
        }
      })
      this.bannerService.getPopupBanner().subscribe(responses => {
        if(responses.status === true) {
          this.bannerPopup = responses.data.url
        }else{
          this.bannerMainReplace = "assets/brand-icons/sale.png"
        }
        this.triggerSales(this.myTemplate)
      })
      
      this.isLoading = true
      this.productService.getAll().pipe(
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe({
        next: res => {
          if(res.status){
            this.mostPopularProducts = res.data.filter((p: any) => p.productIsPopular).map((p: any) => {
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
                active: p.productActive
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
    }catch(err: any){
      console.error(err.message)
    }
    
  }

  triggerSales(ref: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(ref);
  }

  closeSalesBanner(): void {
    this.dialogRef.close()
  }

  onSearch(productName: string): void {
    this.filterStore.update(() => {
      return {
        search: productName,
        category: []
      }
    })
    this.router.navigate(['/main/product'])
  }

  getWidth(): number {
    return window.innerWidth
  }
}






