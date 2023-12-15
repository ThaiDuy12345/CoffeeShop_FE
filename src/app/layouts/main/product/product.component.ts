import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from './../../../core/models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { icons } from '../../../shared/utils/icon.utils';
import { Icon } from 'src/app/core/models/icon.model';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { Subject, finalize } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { MappingService } from 'src/app/core/services/mapping.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
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
  public isInitPriceSlider: boolean = false;
  public maxPrice: number = 0;
  public search: string = '';
  public categories: Category[] = []
  public filterSelect: string[] = [];
  public isLoading: boolean = false;
  public priceFilter: [number, number] = [0, 0];
  public initFilterState = new Subject<any>();
  public calculatedCols: 3 | 2 = 3;
  public viewMode: 'ICON' | 'LIST' = 'ICON';
  constructor(
    private filterStore: FilterStore,
    private productService: ProductService,
    private messageService: NzMessageService,
    private categoryService: CategoryService,
    private mappingService: MappingService
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.getCategory()
  }

  ngOnDestroy(): void {
    this.initFilterState.complete();
  }

  getCategory(): void {
    this.categoryService.getAll().subscribe({
      next: res => {
        if(res.status){
          this.categories = res.data.map((c: any) => this.mappingService.category(c))
          this.getProductList()
        }else this.messageService.error(res.message)
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  getProductList(): void {
    this.productService.getAllWithPrice().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: res => {
        if(res.status){
          const result = res.data.map((p: any) => this.mappingService.product(p));
          const filterResults = this.productService.filterActiveProducts(result)
          this.setInitPriceSlider(filterResults);
          this.setInitFilter(filterResults)
        }else this.messageService.error(res.message)
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  setInitFilter(productData: Product[]): void {
    this.initFilterState.subscribe({
      next: (state) => {
        console.log(productData)
        console.log(this.allProduct)
        if (!state) {
          this.allProduct = [...productData];
          return;
        }
        if (state.category.length > 0) {
          this.allProduct = [...productData.filter((item) =>
            item.category.id ? state.category.includes(item.category.id) : false 
          )];
          this.filterSelect = state.category;
        } else {
          this.allProduct = [...productData];
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
        console.log(productData)
        console.log(this.allProduct)
        if (state.ordering === 1) {
          this.allProduct = this.allProduct.sort(
            (itemA, itemB) => { return itemA.minPrice && itemB.minPrice ? itemB.minPrice - itemA.minPrice : 0 }
          );
          this.optionIndex = 1
        } else if (state.ordering === 2) {
          this.allProduct = this.allProduct.sort(
            (itemA, itemB) => { return itemA.minPrice && itemB.minPrice ? itemA.minPrice - itemB.minPrice : 0 }
          );
          this.optionIndex = 2
        } else {
          this.allProduct = this.allProduct.sort((itemA, itemB) => {
            return itemA.creationDate > itemB.creationDate ? -1 : 1
          });
          this.optionIndex = 0
        }

        if (state.view)  this.viewMode = state.view;

        this.allProduct = this.allProduct.filter(
          (item) => {
            const price = item.minPrice || 0
            return (
              price >= this.priceFilter[0] &&
              price <= this.priceFilter[1]
            )
          }
        );
      },
    });
    this.filterStore._select((state) => state).subscribe(this.initFilterState);
  }

  setInitPriceSlider(allProduct: Product[]): void {
    if(this.isInitPriceSlider) return 
    this.maxPrice = Math.max(...allProduct.map((item) => item.minPrice ? item.minPrice : 0));
    this.priceFilter = [this.minPrice, this.maxPrice] 
    this.marks = {
      [this.minPrice]: this.minPrice.toString(),
      [this.maxPrice]: this.maxPrice.toString(),
    };
    this.isInitPriceSlider = true
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
      this.filterStore.update({ ordering: index });
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
