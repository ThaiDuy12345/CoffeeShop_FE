import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbSidebarModule, NbThemeModule, NbToastrModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    RouterModule,
    HttpClientModule,
    NzIconModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
