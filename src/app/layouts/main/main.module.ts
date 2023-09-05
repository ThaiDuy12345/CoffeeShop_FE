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
import { OrderComponent } from './order/order.component';
import { StepOneOrderComponent } from './order/step-one-order/step-one-order.component';
import { StepTwoOrderComponent } from './order/step-two-order/step-two-order.component';
import { StepThreeOrderComponent } from './order/step-three-order/step-three-order.component';
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
      },
      {
        path: "order/:id",
        canActivate: [AuthGuard],
        component: OrderComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MainModule { }
