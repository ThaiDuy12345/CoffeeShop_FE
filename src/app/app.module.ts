import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbSidebarModule, NbThemeModule, NbToastrModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons'
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
