import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from 'src/app/guard/authGuard.guard';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
const routes: Route[] = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "user",
        canActivate: [AuthGuard],
        component: UserComponent
      },
      {
        path: "product",
        component: ProductComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MainModule { }
