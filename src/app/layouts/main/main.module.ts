import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from 'src/app/guard/authGuard.guard';
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
        path: "user",
        canActivate: [AuthGuard],
        component: UserComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
})
export class MainModule { }
