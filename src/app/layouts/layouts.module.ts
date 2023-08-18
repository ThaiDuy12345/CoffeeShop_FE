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
  NbSearchModule,
  NbCardModule,
  NbMenuModule,
  NbButtonModule,
  NbUserModule,
  NbLayoutModule,
  NbTabsetModule,
  NbIconModule,
  NbContextMenuModule,
  NbToastrModule,
  NbSpinnerModule,
  NbFormFieldModule,
  NbSelectModule,
  NbDialogModule,
} from '@nebular/theme';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
    FooterComponent,
    UserComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    MainModule,
    NbSelectModule,
    FormsModule,
    NzMessageModule,
    
    NbInputModule,
    NbDialogModule.forChild(),
    FontAwesomeModule,
    NbIconModule,
    NbSpinnerModule,
    NzIconModule,
    NbFormFieldModule,
    NbMenuModule,
    NbTabsetModule,
    NbSearchModule,
    NbContextMenuModule,
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
