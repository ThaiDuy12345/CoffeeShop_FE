import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, finalize } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { Product } from 'src/app/core/models/product.model';
import { favoriteProductService } from 'src/app/core/services/favorite-product.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { AuthenticationStore } from 'src/app/core/stores/authentication.store';
@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrl: './favorite-product.component.scss'
})
export class FavoriteProductComponent implements OnInit{
  public allProduct: Product[] = []
  public isLoading: boolean = false
  public tempSubject: Subject<any> = new Subject()
  public account: Account = new Account()

  constructor(
    private messageService: NzMessageService,
    private authenticationStore: AuthenticationStore,
    private favoriteProductService: favoriteProductService,
    private mappingService: MappingService
  ){}
  
  ngOnDestroy(): void {
    this.tempSubject.complete()
  }

  ngOnInit(): void {
    this.tempSubject.subscribe({
      next: res => {
        if(res.account && res.account.phone) {
          this.account = {...res.account}
          this.fetchFavoriteProduct()
        }
      },
      error: err => this.messageService.error(err.error.message)
    })

    this.authenticationStore._select(state => state).subscribe(this.tempSubject)
  }

  fetchFavoriteProduct(): void {
    this.isLoading = true
    this.favoriteProductService.getAllByAccountPhone({ accountPhone: this.account.phone }).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        if(res.status) this.allProduct = res.data.map((o: any) => this.mappingService.favoriteProduct(o).product)
        else this.messageService.error(res.message)
      },
      error: err => this.messageService.error(err.error.message)
    })
  }

  getWidth(): number {
    return window.innerWidth
  }

  getColsByWindowWidth(): number {
    switch (true) {
      case this.getWidth() <= 650:
        return 1;
      case this.getWidth() <= 950:
        return 2;
      default:
        return 4;
    }
  }
}
