import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { MainModule } from './main/main.module';
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
  NbStepperModule,
  NbSpinnerModule,
  NbFormFieldModule,
  NbSelectModule,
  NbAccordionModule,
  NbDialogModule,
} from '@nebular/theme';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
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
@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
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
    CartComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    MainModule,
    NbSelectModule,
    NzBreadCrumbModule,
    FormsModule,
    NzCollapseModule,
    NzTableModule,
    NzTabsModule,
    NzPaginationModule,
    NzProgressModule,
    NzStepsModule,
    NzAvatarModule,
    NbAccordionModule,
    NzMessageModule,
    NbStepperModule,
    NzTimelineModule,
    NzDrawerModule,
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
    NzSliderModule,
    NzMenuModule,
    NbPopoverModule,
    NzResultModule,
    NbToastrModule,
    NbButtonModule,
    NbUserModule,
    NbCardModule,
    NbLayoutModule,
  ],
})
export class LayoutsModule {}
