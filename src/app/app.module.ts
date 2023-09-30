import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { RouterModule } from '@angular/router';
import {
  NbLayoutModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbMenuModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
registerLocaleData(vi);
/** config ng-zorro-antd i18n **/
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

@NgModule({
  declarations: [AppComponent, LayoutsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    RouterModule,
    SocialLoginModule,
    HttpClientModule,
    NzIconModule,
    NbLayoutModule,
    NzBackTopModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1012073931890-qig721spimsddmigqg0r4l5krpdudksi.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1081001676395637'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
