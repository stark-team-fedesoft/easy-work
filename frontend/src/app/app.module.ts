import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home/home.component';
import { CreateWorkspaceComponent } from './components/dialogs/create-workspace/create-workspace.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CreateBoardComponent } from './components/dialogs/create-board/create-board.component';
import { BoardComponent } from './components/home/board/board.component';
import { CreateTaskComponent } from './components/dialogs/create-task/create-task.component';
import { EditBoardComponent } from './components/dialogs/edit-board/edit-board.component';
import { AddUsersComponent } from './components/dialogs/add-users/add-users.component';
import { EditTaskComponent } from './components/dialogs/edit-task/edit-task.component';
import { ArchiveComponent } from './components/dialogs/archive/archive.component';
import { DeleteComponent } from './components/dialogs/delete/delete.component';
import { EditListComponent } from './components/dialogs/edit-list/edit-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateWorkspaceComponent,
    CreateBoardComponent,
    BoardComponent,
    CreateTaskComponent,
    EditBoardComponent,
    AddUsersComponent,
    EditTaskComponent,
    ArchiveComponent,
    DeleteComponent,
    EditListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
