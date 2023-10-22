import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Cookies from 'js-cookie';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Icon } from 'src/app/core/models/icon.model';
import { Product } from 'src/app/core/models/product.model';
import { FeedBack } from 'src/app/core/models/feedback.model';
import { FeedBackData, ProductData, FavoriteProductData, ProductSizeData } from 'src/app/data/data';
import { icons } from 'src/app/shared/utils/icon.utils';
import { FilterStore } from 'src/app/core/stores/filter.store';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormatService } from 'src/app/core/services/format.service';
import { ProductSize } from 'src/app/core/models/product-size.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  public icons: Icon = icons;
  public selected: {
    productId: string;
    quantity: number;
  } = {
    productId: '',
    quantity: 0,
  };
  public product: Product = new Product();
  public productSize: ProductSize[] = []
  public relatedProducts: Product[] = [];
  public productSizeOption: string[] = []
  public feedBackProducts: FeedBack[] = [];
  public feedBackProductsPg: FeedBack[] = [];
  public choosingSize: number = 0
  public avarageStar: number = 0;
  public feedBackPageIndex: number = 1;
  public starRating: number = 0;
  public isLoadingAddToCartBuntton: boolean = false;
  public isLoadingBuyNowButton: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
    private router: Router,
    private formatService: FormatService,
    private filterStore: FilterStore,
    @Optional() private dialogRef: NbDialogRef<any>,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const result = ProductData.find((item) => item.id === params['id']);
      if (!result) {
        this.messageService.error('Mã sản phẩm không tồn tại');
        this.router.navigate(['/main/product']);
        return;
      }
      this.product = result;
      this.loadProductSize();
      this.loadRelatedProducts();
      this.loadFeedBackProduct();
    });
  }

  loadProductSize(): void {
    this.productSize = ProductSizeData.filter(ps => ps.product.id === this.product.id)
    this.productSizeOption = this.productSize.map(ps => 
      `Size ${ps.size_name}`
    )
  }

  getPrice(index: number): number {
    return this.productSize[index].price
  }

  handleProductSizeChange(index: number): void{
    this.choosingSize = index
  }

  loadRelatedProducts(): void {
    const result = ProductData.filter(
      (item) => item.category.id === this.product.category.id
    );
    this.relatedProducts = result.slice(0, 5);
  }

  onClickShare(): void {
    const path = window.location.href
    navigator.clipboard.writeText(path)
      .then(() => {
        this.messageService.success('Đã sao chép đường dẫn');
      })
      .catch((error) => {
        this.messageService.success('Lỗi lấy đường dẫn');
        console.log(error)
      });
  }

  loadFeedBackProduct(): void {
    this.feedBackProducts = FeedBackData.filter((fb) => {
      return fb.product.id === this.product.id;
    });
    this.feedBackProductsPg = this.changeFeedBackIndex();
    const starRates = this.feedBackProducts.reduce((pv, fb) => pv + fb.star, 0);
    this.avarageStar = Math.round(starRates / this.feedBackProducts.length);
  }

  changeFeedBackIndex(): FeedBack[] {
    const last = 3 * this.feedBackPageIndex;
    const begin = last - 3;
    return this.feedBackProducts.slice(begin, last);
  }

  timeSince(date: number): string {
    return this.formatService.timeAgoSince(new Date(date));
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
    this.feedBackProducts.forEach(fb => {
      if (fb.star === starRates){
        sum++
      }
    })

    return sum * 100 / this.feedBackProducts.length
  }

  isUserLoveThisProduct(): boolean {
    const user = Cookies.get('id')
    if(!user) return false
    const result = FavoriteProductData.find(p => p.account.phone === user && p.product.id === this.product.id)
    return result ? true : false
  }

  navigateRelatedProduct(): void {
    this.filterStore.update((state) => {
      return {
        category: [this.product.category.name],
        search: '',
      };
    });
    this.router.navigate(['/main/product']);
  }

  onFeedBackPageChange(index: number): void {
    this.feedBackPageIndex = index;
    this.feedBackProductsPg = this.changeFeedBackIndex();
  }

  open(dialog: TemplateRef<any>): void {
    if (!Cookies.get('id')) {
      this.messageService.error('Bạn cần phải đăng nhập trước khi thao tác!!');
      this.router.navigate(['/sign-in']);
      return;
    }
    this.dialogRef = this.dialogService.open(dialog);
  }

  formatPrice(price: number): string {
    return this.formatService.formatPrice(price)
  }

  onClickSubmit(): void {
    this.messageService.success(
      'Thành công!! Cảm ơn vì đã dành thời gian đánh giá sản phẩm'
    );
    this.dialogRef.close();
  }

  onClickAddToCart(): void {
    this.isLoadingAddToCartBuntton = true;
    setTimeout(() => {
      this.messageService.success('Thêm sản phẩm vào giỏ hàng thành công');
      this.isLoadingAddToCartBuntton = false;
    }, 2000);
  }

  onClickBuyNow(): void {
    this.isLoadingBuyNowButton = true;
    setTimeout(() => {
      this.messageService.warning(
        'Xin lỗi!! Chúng tôi vẫn chưa hỗ trợ tính năng này'
      );
      this.isLoadingBuyNowButton = false;
    }, 2000);
  }
}
