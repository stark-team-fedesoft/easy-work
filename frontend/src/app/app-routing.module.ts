import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBoardComponent } from './views/board/main-board/main-board.component';

const routes: Routes = [
  {path: 'board', component: MainBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
