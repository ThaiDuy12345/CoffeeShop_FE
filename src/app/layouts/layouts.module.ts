import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import * as i from './index';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TabViewModule } from 'primeng/tabview';
@NgModule({
  declarations: [
    i.SignInComponent,
    i.SignUpComponent,
    i.SignOutComponent,
    i.P404Component
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    FormsModule,
    RouterModule,
    ToastModule,
    FontAwesomeModule,
    TabViewModule
  ],
  exports: [
    RouterModule,
    ToastModule,
    FormsModule,
    FontAwesomeModule,
    TabViewModule
  ]
})
export class LayoutsModule { }
