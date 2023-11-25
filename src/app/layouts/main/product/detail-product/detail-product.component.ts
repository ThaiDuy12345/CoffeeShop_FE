import { favoriteProductService } from './../../../../core/services/favorite-product.service';
import { Component, OnDestroy, OnInit, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Cookies from 'js-cookie';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { Feedback } from 'src/app/core/models/feedback.model';
import { FeedbackData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ProductSize } from 'src/app/core/models/product-size.model';
import { ProductService } from 'src/app/core/services/product.service';
import { Subject, finalize } from 'rxjs';
import { ProductSizeService } from 'src/app/core/services/product-size.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { OrderingService } from 'src/app/core/services/ordering.service';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
import { Ordering } from 'src/app/core/models/ordering.model';
import { DetailOrderService } from 'src/app/core/services/detail-order.service';
import { Account } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
})
export class DetailProductComponent implements OnInit, OnDestroy {
  public icons: Icon = icons;
  public productSizeQuantity: number = 1
  public product: Product = new Product();
  public productSize: ProductSize[] = []
  public relatedProducts: Product[] = [];
  public productSizeOption: string[] = []
  public feedbackProducts: Feedback[] = [];
  public feedbackProductsPg: Feedback[] = [];
  public account: Account = new Account();
  public choosingSize: number = 0
  public avarageStar: number = 0;
  public feedbackPageIndex: number = 1;
  public isUserLoveThisProduct: boolean = false;
  public soldQuantity: number = 0
  public starRating: number = 0;
  public isLoadingAddToCartBuntton: boolean = false;
  public isLoadingBuyNowButton: boolean = false;
  public isLoading: boolean = false
  public tempSubject: Subject<any> = new Subject<any>()
  public ordering: Ordering = new Ordering 
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
    private router: Router,
    private filterStore: FilterStore,
    @Optional() private dialogRef: NbDialogRef<any>,
    private orderingService: OrderingService,
    private favoriteProductService: favoriteProductService,
    private detailOrderService: DetailOrderService,
    private authenticationStore: AuthenticationStore,
    private dialogService: NbDialogService,
    private productService: ProductService,
    private productSizeService: ProductSizeService,
    private mappingService: MappingService
  ) {}

  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(!params['id']){
        this.messageService.error('Mã sản phẩm không tồn tại');
        this.router.navigate(['/main/product']);
        return;
      }

      this.productService.getById({ productId: params['id'] }).pipe(
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe({
        next: res => {
          if(res.status){

            if(!res.data.productActive){
              this.messageService.error('Mã sản phẩm không tồn tại');
              this.router.navigate(['/main/product']);
              return
            }

            this.product = this.mappingService.product(res.data)
            this.loadProductSize();
            this.loadProductSoldQuantity();
            this.loadRelatedProducts();
            this.fetchOrder()
            // this.loadFeedbackProduct();
          }else{
            this.messageService.error(res.message);
            this.router.navigate(['/main/product']);
          }
        },
        error: err => {
          this.messageService.error(err.error.message);
          this.router.navigate(['/main/product']);
        }
      })
    });
  }

  loadProductSoldQuantity(): void {
    this.productService.getSoldQuantityById({ productId: this.product.id }).subscribe({
      next: res => {
        if(res.status) this.soldQuantity = res.data
        else this.messageService.error(res.message);
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  fetchOrder(): void {
    this.tempSubject.subscribe({
      next: res => {
        if(res.account && res.account.phone) {
          this.account = {...res.account}
          this.fetchCurrentOrderingCart()
          this.loadIsFavorite()
        }
      },
      error: err => this.messageService.error(err.error.message)
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }

  loadIsFavorite(): void {
    this.favoriteProductService.isFavoriteByProductIdAndAccountPhone({ accountPhone: this.account.phone, productId: this.product.id }).subscribe({
      next: res => {
        if(res.status) this.isUserLoveThisProduct = res.data
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  onClickUnFavorite(): void {
    this.favoriteProductService.delete({ accountPhone: this.account.phone, productId: this.product.id }).subscribe({
      next: res => {
        if(res.status) {
          this.messageService.success("Đã gỡ bỏ sản phẩm ra khỏi danh sách yêu thích")
          this.isUserLoveThisProduct = false
        }
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  onClickFavorite(): void {
    this.favoriteProductService.post({ accountPhone: this.account.phone, productId: this.product.id }).subscribe({
      next: res => {
        if(res.status) {
          this.messageService.success("Đã thêm sản phẩm vào danh sách yêu thích")
          this.isUserLoveThisProduct = true
        }
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  fetchCurrentOrderingCart(): void {
    this.orderingService.getTheCurrentCart({ accountPhone: this.account.phone }).subscribe({
      next: res => {
        if(res.status){
          this.ordering = { ...this.mappingService.ordering(res.data) }
        }else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message),
    })
  }

  loadProductSize(): void {
    this.productSizeOption = []
    this.choosingSize = 0
    this.productSizeService.getByProductId({ productId: this.product.id }).subscribe({
      next: res => {
        if(res.status) {
          this.productSize = res.data.map((ps: any) => this.mappingService.productSize(ps))
          this.productSizeOption = this.productSize.map(ps => 
            `Size ${ps.size}`
          )
        }else this.messageService.error(res.message);
      },
      error: err => {
        this.messageService.error(err.error.message);
      }
    })    
  }

  getPrice(index: number): number {
    return this.productSize[index].price
  }

  handleProductSizeChange(index: number): void{
    this.choosingSize = index
  }

  loadRelatedProducts(): void {
    this.productService.getAllWithPrice().subscribe({
      next: res => {
        if(res.status){
          const result = res.data.filter((p: any) => p.categoryEntity.categoryId === this.product.category.id).map((p: any) => this.mappingService.product(p))
          this.relatedProducts = this.productService.filterActiveProducts(result).slice(0, 5)
        }else this.messageService.error(res.message);
      },
      error: err => {
        this.messageService.error(err.error.message);
      }
    })
  }

  onClickShare(): void {
    const path = window.location.href
    navigator.clipboard.writeText(path)
      .then(() => {
        this.messageService.success('Đã sao chép đường dẫn');
      })
      .catch((error) => {
        this.messageService.success('Lỗi lấy đường dẫn');
      });
  }

  loadFeedbackProduct(): void {
    this.feedbackProducts = FeedbackData.filter((fb) => {
      return fb.product.id === this.product.id;
    });
    this.feedbackProductsPg = this.changeFeedbackIndex();
    const starRates = this.feedbackProducts.reduce((pv, fb) => pv + fb.rate, 0);
    this.avarageStar = Math.round(starRates / this.feedbackProducts.length);
  }

  changeFeedbackIndex(): Feedback[] {
    const last = 3 * this.feedbackPageIndex;
    const begin = last - 3;
    return this.feedbackProducts.slice(begin, last);
  }

  renderStarColor(star: number): string {
    switch (true) {
      case star === 0:
        return 'rgb(121, 125, 133)';
      default:
        return '#FADB14'
    }
  }

  getStarRatePercent(starRates: number): number {
    let sum = 0
    this.feedbackProducts.forEach(fb => {
      if (fb.rate === starRates){
        sum++
      }
    })

    return sum * 100 / this.feedbackProducts.length
  }

  navigateRelatedProduct(): void {
    this.filterStore.update((state) => {
      return {
        category: [this.product.category.id],
        search: '',
      };
    });
    this.router.navigate(['/main/product']);
  }

  onFeedbackPageChange(index: number): void {
    this.feedbackPageIndex = index;
    this.feedbackProductsPg = this.changeFeedbackIndex();
  }

  open(dialog: TemplateRef<any>): void {
    if (!Cookies.get('id')) {
      this.messageService.error('Bạn cần phải đăng nhập trước khi thao tác!!');
      this.router.navigate(['/sign-in']);
      return;
    }
    this.dialogRef = this.dialogService.open(dialog);
  }

  onClickSubmit(): void {
    this.messageService.success(
      'Thành công!! Cảm ơn vì đã dành thời gian đánh giá sản phẩm'
    );
    this.dialogRef.close();
  }

  onClickAddToCart(): void {
    if(!this.ordering.id){
      this.router.navigateByUrl("/sign-in")
      this.messageService.error("Bạn cần đăng nhập để tiếp tục")
      return
    }

    if(this.productSizeQuantity < 1){
      this.messageService.error("Số lượng sản phẩm không hợp lệ")
      return
    }

    this.isLoadingAddToCartBuntton = true;
    this.detailOrderService.post({
      detailOrderId: {
        orderingId: this.ordering.id,
        productSizeId: this.productSize[this.choosingSize].id
      },
     detailOrderProductQuantity: this.productSizeQuantity
    }).pipe(finalize(() => this.isLoadingAddToCartBuntton = false)).subscribe({
      next: res => {
        if(res.status){
          this.messageService.success("Thêm sản phẩm vào giỏ hàng thành công, hãy ghé qua 'ĐƠN HÀNG' để xem chi tiết giỏ hàng của bạn")
        }else{
          this.messageService.error(res.message)
        }
      },
      error: err => {
        this.messageService.error(err.error.message)
      }
    })
  }

  preventNegativeInput(): void {
    this.productSizeQuantity = this.productSizeQuantity === null || this.productSizeQuantity <= 0 ? 1 : Math.round(Math.abs(this.productSizeQuantity))
    this.productSizeQuantity = this.productSizeQuantity <= 0 ? 1 : this.productSizeQuantity
  }

  onClickBuyNow(): void {
    if(!this.ordering.id){
      this.router.navigateByUrl("/sign-in")
      this.messageService.error("Bạn cần đăng nhập để tiếp tục")
      return
    }
    this.isLoadingBuyNowButton = true;
    setTimeout(() => {
      this.messageService.warning(
        'Xin lỗi!! Chúng tôi vẫn chưa hỗ trợ tính năng này'
      );
      this.isLoadingBuyNowButton = false;
    }, 2000);
  }
}
