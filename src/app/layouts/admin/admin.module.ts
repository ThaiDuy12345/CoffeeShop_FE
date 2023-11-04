import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from 'src/app/guard/adminGuard.guard';
import { SupportManagementComponent } from './support-management/support-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { OrderingManagementComponent } from './ordering-management/ordering-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BannerComponent } from './layout-management/banner/banner.component';
import { PopularProductComponent } from './layout-management/popular-product/popular-product.component';
import { DetailAccountManagementComponent } from './account-management/detail-account-management/detail-account-management.component';
import { DetailProductManagementComponent } from './product-management/detail-product-management/detail-product-management.component';
import { StaffGuard } from 'src/app/guard/staffGuard.guard';
import { DiscountManagementComponent } from './discount-management/discount-management.component';
import { DetailDiscountManagementComponent } from './discount-management/detail-discount-management/detail-discount-management.component';
import { DetailOrderingManagementComponent } from './ordering-management/detail-ordering-management/detail-ordering-management.component';
const routes: Route[] = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [StaffGuard],
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
        canActivate: [AdminGuard],
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
        canActivate: [AdminGuard],
        component: SupportManagementComponent
      },
      {
        path: "account-management",
        canActivate: [AdminGuard],
        children: [
          {
            path: "",
            component: AccountManagementComponent,
          },
          {
            path: "new",
            component: DetailAccountManagementComponent
          },
          {
            path: ":id",
            component: DetailAccountManagementComponent
          },
        ]
        
      },
      {
        path: "product-management",
        canActivate: [AdminGuard],
        children: [
          {
            path: "",
            component: ProductManagementComponent
          },
          {
            path: "new",
            component: DetailProductManagementComponent
          },
          {
            path: ":id",
            component: DetailProductManagementComponent
          }
        ]
      },
      {
        path: "category-management",
        canActivate: [AdminGuard],
        component: CategoryManagementComponent
      },
      {
        path: "feedback-management",
        canActivate: [AdminGuard],
        component: FeedbackManagementComponent
      },
      {
        path: "ordering-management",
        children: [
          {
            path: "",
            component: OrderingManagementComponent
          },
          {
            path: ":id",
            component: DetailOrderingManagementComponent
          }
        ]
      },
      {
        path: "discount-management",
        canActivate: [AdminGuard],
        children: [
          {
            path: "",
            component: DiscountManagementComponent
          },
          {
            path: "new",
            component: DetailDiscountManagementComponent
          },
          {
            path: ":id",
            component: DetailDiscountManagementComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
})
export class AdminModule { }
