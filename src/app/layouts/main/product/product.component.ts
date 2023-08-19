import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { icons } from '../../../shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  public icons: Icon = icons;
  public allProduct: Product[] = [];
  public marks: {
    [key: string]: string;
  } = {};
  public minPrice: number = 0;
  public maxPrice: number = 0;
  public search: string = '';
  public isLoading: boolean = false;
  public priceFilter: [number, number] = [0, 0];
  public initFilterState = new Subject<any>()
  constructor(private filterStore: FilterStore) {}

  ngOnInit(): void {
    this.getProductList();
  }
  
  ngOnDestroy(): void {
    this.initFilterState.complete()
  }

  getProductList(): void {
    this.initFilterState.subscribe({
      next: (state) => {
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
            this.search = state.search;
            this.allProduct = this.allProduct.filter((item) =>
              item.name.toLowerCase().includes(state.search.toLowerCase())
            );
          } else {
            this.search = '';
          }
          this.setInitPriceSlider(this.allProduct);
          this.isLoading = false;
        }, 1000);
      }
    })
    this.filterStore
      ._select((state) => state)
      .subscribe(this.initFilterState);
    
  }

  setInitPriceSlider(allProduct: Product[]): void {
    this.maxPrice = Math.max(...allProduct.map((item) => item.price));
    this.priceFilter = [this.minPrice, this.maxPrice];
    this.marks = {
      [this.minPrice]: this.minPrice.toString(),
      [this.maxPrice]: this.maxPrice.toString(),
    };
  }

  onClickResetFilterSearch(resetField: 'category' | 'search'): void {
    if (resetField === 'category') {
      this.filterStore.update(state => {
        return {
          category: '',
          search: this.search,
        }
      });
    } else {
      this.filterStore.update(state => {
        return {
          category: state.category,
          search: '',
        }
      });
    }
  }

  updateFilter(category: string): void {
    this.filterStore.update(state => {
      return {
        category: category,
        search: this.search,
      }
    });
  }
}
