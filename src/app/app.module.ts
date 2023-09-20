import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
const firebaseConfig = {
  apiKey: "AIzaSyCAZ-8faDUSDw9Krd9hCaK5rhPgDI2EcSk",
  authDomain: "coffee-shop-project-f6ca3.firebaseapp.com",
  databaseURL: "https://coffee-shop-project-f6ca3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffee-shop-project-f6ca3",
  storageBucket: "coffee-shop-project-f6ca3.appspot.com",
  messagingSenderId: "124592920764",
  appId: "1:124592920764:web:aebb399b66ba3a8fe398b9",
  measurementId: "G-JYTD2FPXLG"
};
@NgModule({
  declarations: [AppComponent, LayoutsComponent],
  imports: [
    provideFirebaseApp(() => initializeApp( firebaseConfig )),
    provideFirestore(() => getFirestore()),
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
