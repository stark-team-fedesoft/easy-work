import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBoardComponent } from './views/board/main-board/main-board.component';
import { BeginComponent } from './views/home/begin/begin.component';
import { LoginComponent } from './views/home/login/login.component';
import { RegisterComponent } from './views/home/register/register.component';

const routes: Routes = [
  {
    path:'',
    component:BeginComponent
  },
  {
  path: 'board', 
  component: MainBoardComponent
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
    path:'mainboard',
    component:MainBoardComponent
  },
  {
    path:'begin',
    component:BeginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
