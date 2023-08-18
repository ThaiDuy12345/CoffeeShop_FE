import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { ActivatedRoute, Router } from '@angular/router';
import { icons } from '../../../shared/utils/icon.utils'
import { Icon } from 'src/app/core/models/icon.model';
import { FilterStore } from 'src/app/core/stores/filter.store';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  public icons: Icon = icons
  public allProduct: Product[] = [];
  public marks: {
    [key: string]: string;
  } = {};
  public minPrice: number = 0;
  public maxPrice: number = 0;
  public search: string = ''
  public isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filterStore: FilterStore
  ) {}

  ngOnDestroy(): void {
    this.filterStore.update({ category: '', search: '' })
  }

  ngOnInit(): void {
    this.setInitPriceSlider();
    this.getProductList()
  }

  getProductList(): void{
    this.filterStore._select(state => state).subscribe(state => {
      this.isLoading = true;
      setTimeout(() => {
        this.allProduct = ProductData;
        if (!state) {
          this.isLoading = false;
          return;
        }
        if (state.category.length > 0) {
          this.allProduct = this.allProduct.filter(
            (item) => item.category.name === state.category
          );
        }
        if (state.search.length > 0) {
          this.search = state.search
          this.allProduct = this.allProduct.filter((item) =>
            item.name.toLowerCase().includes(state.search.toLowerCase())
          );
        }else{
          this.search = ''
        }
        this.isLoading = false;
      }, 1000);
    })
  }

  setInitPriceSlider(): void {
    this.maxPrice = Math.max(...this.allProduct.map((item) => item.price));
    this.marks[this.minPrice.toString()] = this.minPrice.toString();
    this.marks[this.maxPrice.toString()] = this.maxPrice.toString();
  }

  onClickResetFilterSearch(resetField: 'category' | 'search'): void {
    if(resetField === 'category'){
      this.filterStore.update({
        category: '',
        search: this.search
      })

    }else{
      this.filterStore._select(state => state.category).subscribe(category => {
        this.filterStore.update({
          category: category,
          search: ''
        })
      })
    }
  }
  
  updateFilter(category: string): void {
   this.filterStore.update({
    category: category,
    search: this.search
   })
  }
}
