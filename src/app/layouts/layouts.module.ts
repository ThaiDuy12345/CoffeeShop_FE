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
import { NbPopoverModule, NbMenuModule, NbButtonModule,NbUserModule , NbLayoutModule, NbTabsetModule, NbIconModule, NbContextMenuModule, NbToastrModule, NbSpinnerModule } from '@nebular/theme';
@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    P404Component,
    MainComponent,
    DashboardComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    MainModule,
    FormsModule,
    FontAwesomeModule,
    NbIconModule,
    NbSpinnerModule,
    NbMenuModule,
    NbTabsetModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbToastrModule,
    NbButtonModule,
    NbUserModule,
    NbLayoutModule
  ]
})
export class LayoutsModule { }
