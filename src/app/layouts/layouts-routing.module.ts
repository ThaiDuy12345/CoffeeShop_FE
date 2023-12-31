import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P404Component } from './p404/p404.component';
import { AuthGuard } from '../guard/authGuard.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PrivaryPolicyComponent } from './privary-policy/privary-policy.component';
import { TermsAndServicesComponent } from './terms-and-services/terms-and-services.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
    path: "main",
    loadChildren: () => import ('./main/main.module').then(
      m => m.MainModule
    )
  },
  {
    path: "admin",
    loadChildren: () => import ('./admin/admin.module').then(
      m => m.AdminModule
    )
  },
  {
    path: 'privacy-policy',
    component: PrivaryPolicyComponent
  },
  {
    path: 'terms-and-services',
    component: TermsAndServicesComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "sign-out",
    component: SignOutComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "**",
    component: P404Component,
    data: {
      title: "Page 404"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class LayoutsRoutingModule { }
