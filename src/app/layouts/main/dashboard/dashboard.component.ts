import { FilterStore } from './../../../core/stores/filter.store';
import { Component, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { Router } from '@angular/router';
import { Icon } from 'src/app/core/models/icon.model';
import { icons } from 'src/app/shared/utils/icon.utils';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public mostPopularProducts: Product[] = ProductData
  public icons: Icon = icons
  @ViewChild('dialog', { static: true }) public myTemplate!: TemplateRef<any>
  
  constructor(
    private filterStore: FilterStore,
    private router: Router,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
  ){}
  
  ngOnInit(): void {
    this.mostPopularProducts = ProductData.filter(product => product.isPopular === true)
    this.triggerSales(this.myTemplate)
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






