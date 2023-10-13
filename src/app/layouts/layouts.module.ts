import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { MainModule } from './main/main.module';
import { AdminModule } from './admin/admin.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { P404Component } from './p404/p404.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import {
  NbPopoverModule,
  NbInputModule,
  NbCardModule,
  NbMenuModule,
  NbButtonModule,
  NbSearchModule,
  NbUserModule,
  NbLayoutModule,
  NbButtonGroupModule,
  NbTabsetModule,
  NbIconModule,
  NbContextMenuModule,
  NbToastrModule,
  NbRadioModule,
  NbStepperModule,
  NbSpinnerModule,
  NbFormFieldModule,
  NbSelectModule,
  NbAccordionModule,
  NbDialogModule,
  NbSidebarModule,
} from '@nebular/theme';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ProductListComponent } from '../shared/components/product-list/product-list.component';
import { UserComponent } from './main/user/user.component';
import { EditUserComponent } from './main/user/edit-user/edit-user.component';
import { ChangePasswordComponent } from './main/user/change-password/change-password.component';
import { AboutComponent } from './main/about/about.component';
import { ProductComponent } from './main/product/product.component';
import { ImageComponent } from '../shared/components/image/image.component';
import { DetailProductComponent } from './main/product/detail-product/detail-product.component';
import { CartComponent } from './main/cart/cart.component';
import { ShoppingCartComponent } from './main/cart/shopping-cart/shopping-cart.component';
import { HistoryOrderComponent } from './main/cart/history-order/history-order.component';
import { OrderComponent } from './main/order/order.component';
import { StepOneOrderComponent } from './main/order/step-one-order/step-one-order.component';
import { StepTwoOrderComponent } from './main/order/step-two-order/step-two-order.component';
import { StepThreeOrderComponent } from './main/order/step-three-order/step-three-order.component';
import { FavoriteProductComponent } from './main/favorite-product/favorite-product.component';
import { SupportComponent } from './main/support/support.component';
import { AdminComponent } from './admin/admin.component';
import { SupportManagementComponent } from './admin/support-management/support-management.component';
import { AccountManagementComponent } from './admin/account-management/account-management.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { CategoryManagementComponent } from './admin/category-management/category-management.component';
import { FeedbackManagementComponent } from './admin/feedback-management/feedback-management.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { SalesManagementComponent } from './admin/sales-management/sales-management.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from '../shared/components/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../shared/components/admin-sidebar/admin-sidebar.component';
import { BannerComponent } from './admin/layout-management/banner/banner.component';
import { PopularProductComponent } from './admin/layout-management/popular-product/popular-product.component';
import { AdminChartComponent } from '../shared/components/admin-chart/admin-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DetailAccountManagementComponent } from './admin/account-management/detail-account-management/detail-account-management.component';
import { DetailProductManagementComponent } from './admin/product-management/detail-product-management/detail-product-management.component';
import { BasicFormComponent } from './admin/product-management/detail-product-management/basic-form/basic-form.component';
import { SizeFormComponent } from './admin/product-management/detail-product-management/size-form/size-form.component';
@NgModule({
  declarations: [
    SupportComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    FavoriteProductComponent,
    P404Component,
    MainComponent,
    EditUserComponent,
    ChangePasswordComponent,
    DashboardComponent,
    HeaderComponent,
    ProductComponent,
    ProductListComponent,
    DetailProductComponent,
    ShoppingCartComponent,
    HistoryOrderComponent,
    FooterComponent,
    UserComponent,
    AboutComponent,
    OrderComponent,
    ImageComponent,
    CartComponent,
    StepOneOrderComponent,
    DetailProductManagementComponent,
    StepTwoOrderComponent,
    StepThreeOrderComponent,
    AdminComponent,
    BannerComponent,
    PopularProductComponent,
    AdminChartComponent,
    SupportManagementComponent,
    AccountManagementComponent,
    ProductManagementComponent,
    CategoryManagementComponent,
    FeedbackManagementComponent,
    OrderManagementComponent,
    DetailAccountManagementComponent,
    SalesManagementComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    BasicFormComponent,
    SizeFormComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    MainModule,
    AdminModule,
    NbSelectModule,
    NzBreadCrumbModule,
    NzUploadModule,
    FormsModule,
    NzCollapseModule,
    NbRadioModule,
    NzTableModule,
    NzSegmentedModule,
    NzToolTipModule,
    NzBadgeModule,
    NzTabsModule,
    NzPaginationModule,
    NzProgressModule,
    NzStepsModule,
    NzAvatarModule,
    NbAccordionModule,
    NzTagModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzMessageModule,
    NbStepperModule,
    NzTimelineModule,
    NzDrawerModule,
    GoogleSigninButtonModule,
    NzSkeletonModule,
    NbSelectModule,
    NbSearchModule,
    NbInputModule,
    NbDialogModule.forChild(),
    FontAwesomeModule,
    NbIconModule,
    NbSpinnerModule,
    NzIconModule,
    NbButtonGroupModule,
    NzCommentModule,
    NbFormFieldModule,
    NbMenuModule,
    NbTabsetModule,
    NbContextMenuModule,
    NzDividerModule,
    NgApexchartsModule,
    NzSliderModule,
    NzMenuModule,
    NbPopoverModule,
    NzResultModule,
    NbToastrModule,
    NbButtonModule,
    NbUserModule,
    NbSidebarModule,
    NbCardModule,
    NbLayoutModule,
  ],
})
export class LayoutsModule {}
