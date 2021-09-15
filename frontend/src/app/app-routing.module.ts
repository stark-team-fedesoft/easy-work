import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { BeginComponent } from './components/auth/begin/begin.component';




const routes: Routes = [
  {
    path:'',
    component:BeginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signUp',
    component:RegisterComponent
  },
 
  {
    path:'begin',
    component:BeginComponent
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
