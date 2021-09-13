import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainBoardComponent } from './views/board/main-board/main-board.component';
import { LoginComponent } from './views/home/login/login.component';
import { RegisterComponent } from './views/home/register/register.component';
import { BeginComponent } from './views/home/begin/begin.component';

import { UserService } from './services/user.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainBoardComponent,
    LoginComponent,
    RegisterComponent,
    BeginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
