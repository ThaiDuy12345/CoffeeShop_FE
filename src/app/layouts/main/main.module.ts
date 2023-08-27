import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from 'src/app/guard/authGuard.guard';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingCartComponent } from './cart/shopping-cart/shopping-cart.component';
import { HistoryOrderComponent } from './cart/history-order/history-order.component';
const routes: Route[] = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "user",
        canActivate: [AuthGuard],
        component: UserComponent
      },
      {
        path: "product",
        children: [
          {
            path: '',
            component: ProductComponent
          },
          {
            path: ':id',
            component: DetailProductComponent
          }
        ]
      },
      {
        path: "cart",
        canActivate: [AuthGuard],
        component: CartComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
})
export class MainModule { }
