import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from 'src/app/guard/adminGuard.guard';
import { SupportManagementComponent } from './support-management/support-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { SalesManagementComponent } from './sales-management/sales-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BannerComponent } from './layout-management/banner/banner.component';
import { PopularProductComponent } from './layout-management/popular-product/popular-product.component';
import { DetailAccountManagementComponent } from './account-management/detail-account-management/detail-account-management.component';
const routes: Route[] = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: "",
        redirectTo: "admin-dashboard",
        pathMatch: "full"
      },
      {
        path: "admin-dashboard",
        component: AdminDashboardComponent
      },
      {
        path: "layout-management",
        children: [
          {
            path: "",
            redirectTo: "banner",
            pathMatch: "full"
          },
          {
            path: "banner",
            component: BannerComponent
          },
          {
            path: "popular-product",
            component: PopularProductComponent
          }
        ]
      },
      {
        path: "support-management",
        component: SupportManagementComponent
      },
      {
        path: "account-management",
        component: AccountManagementComponent,
      },
      {
        path: "account-management/:id",
        component: DetailAccountManagementComponent
      },
      {
        path: "account-management/new",
        component: DetailAccountManagementComponent
      },
      {
        path: "product-management",
        component: ProductManagementComponent
      },
      {
        path: "category-management",
        component: CategoryManagementComponent
      },
      {
        path: "feedback-management",
        component: FeedbackManagementComponent
      },
      {
        path: "order-management",
        component: OrderManagementComponent
      },
      {
        path: "sales-management",
        component: SalesManagementComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
})
export class AdminModule { }
