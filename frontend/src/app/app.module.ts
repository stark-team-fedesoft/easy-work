import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home/home.component';
import { CreateWorkspaceComponent } from './components/dialogs/create-workspace/create-workspace.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CreateBoardComponent } from './components/dialogs/create-board/create-board.component';
import { BoardComponent } from './components/home/board/board.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivitiesService } from './services/activities.service';
import { DialogContentExampleDialog, MainBoardComponent } from './views/board/main-board/main-board.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';


@NgModule({
  entryComponents: [DialogContentExampleDialog],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateWorkspaceComponent,
    CreateBoardComponent,
    BoardComponent,
    ActivitiesComponent,
    MainBoardComponent,
    DialogContentExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatColorPickerModule,
  ],
  providers: [
    ActivitiesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
