import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { Product } from 'src/app/core/models/product.model';
import { FavoriteProductData } from 'src/app/data/data';
@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.scss']
})
export class FavoriteProductComponent implements OnInit{
  public allProduct: Product[] = []
  public isLoading: boolean = false
  ngOnInit(): void {
    this.isLoading = true 
    setTimeout(() => {
      const user = Cookies.get('id')
      if(user){
        const result = FavoriteProductData.filter(p => p.account.id === user)
        this.allProduct = result.map(p => p.product)
      }
      this.isLoading = false 
    }, 600)
  }

  getWidth(): number {
    return window.innerHeight
  }
}
