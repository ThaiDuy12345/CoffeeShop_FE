import { FilterStore } from './../../../core/stores/filter.store';
import { Component, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { Router } from '@angular/router';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { BannerService } from 'src/app/core/services/banner.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public mostPopularProducts: Product[] = ProductData
  public bannerPopup: string = ""
  public bannerMain: string = ""
  public bannerMainReplace: string = ""
  public bannerPopupReplace: string = ""
  public icons: Icon = icons
  @ViewChild('dialog', { static: true }) public myTemplate!: TemplateRef<any>
  
  constructor(
    private filterStore: FilterStore,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
    private bannerService: BannerService
  ){}
  
  ngOnInit(): void {
    this.mostPopularProducts = ProductData.filter(product => product.isPopular === true)
    this.initData()
  }

  initData(): void {
    try{
      this.bannerService.getMainBanner().subscribe(responses => {
        if(responses.status === 200) {
          this.bannerMain = responses.data.image.url
        }else{
          this.bannerMainReplace = "assets/brand-icons/banner.jpg"
        }
      })
      this.bannerService.getPopupBanner().subscribe(responses => {
        if(responses.status === 200) {
          this.bannerPopup = responses.data.image.url
        }else{
          this.bannerMainReplace = "assets/brand-icons/sale.png"
        }
        this.triggerSales(this.myTemplate)
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






