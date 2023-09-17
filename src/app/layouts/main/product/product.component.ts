import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductData } from 'src/app/data/data';
import { icons } from '../../../shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Subject } from 'rxjs';
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
  public optionIndex: number = 0
  public options = ['Mới nhất', 'Giá cao nhất', 'Giá thấp nhất'];
  public minPrice: number = 0;
  public maxPrice: number = 0;
  public search: string = '';
  public filterSelect: string[] = [];
  public isLoading: boolean = false;
  public priceFilter: [number, number] = [0, 0];
  public initFilterState = new Subject<any>();
  public calculatedCols: 3 | 2 = 3;
  public viewMode: 'ICON' | 'LIST' = 'ICON';
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
          if (state.category.length > 0) {
            this.allProduct = ProductData.filter((item) =>
              state.category.includes(item.category.name)
            );
            this.filterSelect = state.category;
          } else {
            this.allProduct = ProductData;
            this.filterSelect = [];
          }

          if (state.search.length > 0) {
            this.search = state.search;
            this.allProduct = this.allProduct.filter((item) =>
              item.name.toLowerCase().includes(state.search.toLowerCase())
            );
          } else {
            this.search = '';
          }

          if (state.order === 1) {
            this.allProduct = this.allProduct.sort(
              (itemA, itemB) => itemB.price - itemA.price
            );
            this.optionIndex = 1
          } else if (state.order === 2) {
            this.allProduct = this.allProduct.sort(
              (itemA, itemB) => itemA.price - itemB.price
            );
            this.optionIndex = 2
          } else {
            this.allProduct = this.allProduct.sort((itemA, itemB) => {
              if (itemA.creation_date > itemB.creation_date) {
                return 1;
              } else {
                return -1;
              }
            });
            this.optionIndex = 0
          }

          if (state.view) {
            this.viewMode = state.view;
          }

          this.allProduct = this.allProduct.filter(
            (item) =>
              item.price >= this.priceFilter[0] &&
              item.price <= this.priceFilter[1]
          );
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

  onClickResetFilterSearch(): void {
    this.filterStore.update((state) => {
      return {
        search: '',
      };
    });
  }

  handleIndexChange(index: number): void {
    console.log(index);
    if (index === 0 || index === 1 || index === 2) {
      this.filterStore.update({ order: index });
    }
  }

  updateFilter(category: string[]): void {
    this.filterSelect = category;
    this.filterStore.update(() => {
      return {
        category: category,
      };
    });
  }

  updateView(viewMode: 'ICON' | 'LIST'): void {
    this.filterStore.update((state) => {
      return {
        view: viewMode,
      };
    });
  }

  onChangePriceFilter(): void {
    this.getProductList();
  }

  getColsByWindowWidth(): number {
    switch (true) {
      case window.innerWidth <= 650:
        return 1;
      case window.innerWidth <= 950:
        return 2;
      default:
        return 3;
    }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   this.calculatedCols = this.getWindowWidth() > 1000 ? 3 : 2;
  // }
}
