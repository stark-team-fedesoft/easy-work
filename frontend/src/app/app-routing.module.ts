import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BoardComponent } from './components/home/board/board.component';
import { HomeComponent } from './components/home/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MainBoardComponent } from './components/board/main-board/main-board.component';
import { ProfileComponent } from './components/home/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home/:workspace_id', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'boards/:board_id', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'boards2/:board_id', component: MainBoardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
