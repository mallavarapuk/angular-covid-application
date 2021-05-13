import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from './login/login.component'
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
