import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  public initFilterState = new Subject<any>();
  public calculatedCols: 3 | 2 = 3
  constructor(private filterStore: FilterStore) {}

  ngOnInit(): void {
    this.setInitPriceSlider(ProductData);
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.initFilterState.complete();
  }

  getProductList(): void {
    this.initFilterState.subscribe({
      next: (state) => {
        if (!state) {
          this.allProduct = ProductData;
          return;
        }
        this.isLoading = true;
        setTimeout(() => {
          this.allProduct =
            state.category.length > 0
              ? ProductData.filter(
                  (item) => state.category.includes(item.category.name)
                )
              : ProductData;
          if (state.search.length > 0) {
            this.search = state.search;
            this.allProduct = this.allProduct.filter((item) =>
              item.name.toLowerCase().includes(state.search.toLowerCase())
            );
          } else {
            this.search = '';
          }
          this.allProduct = this.allProduct.filter((item) => item.price >= this.priceFilter[0] && item.price <= this.priceFilter[1])
          this.isLoading = false;
        }, 600);
      },
    });
    this.filterStore._select((state) => state).subscribe(this.initFilterState);
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
    this.filterStore.update((state) => {
      const newState =
        resetField === 'category'
          ? {
              category: [],
              search: this.search,
            }
          : {
              category: state.category,
              search: '',
            };
      return newState;
    });
  }

  updateFilter = (category: string[]): void => {
    this.filterStore.update(() => {
      return {
        category: category,
        search: this.search,
      };
    });
  }

  onChangePriceFilter = (): void => {
    this.getProductList()
  }

  getColsByWindowWidth = (): number => {
    return window.innerWidth > 950 ? 3 : 2
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   this.calculatedCols = this.getWindowWidth() > 1000 ? 3 : 2;
  // }

}
