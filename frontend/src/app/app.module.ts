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
import { DialogContentExampleDialog, MainBoardComponent } from './components/board/main-board/main-board.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

import { CreateTaskComponent } from './components/dialogs/create-task/create-task.component';
import { CreateListComponent } from './components/dialogs/create-list/create-list.component';
import { EditBoardComponent } from './components/dialogs/edit-board/edit-board.component';
import { AddUsersComponent } from './components/dialogs/add-users/add-users.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/board/calendar/calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EditTaskComponent } from './components/dialogs/edit-task/edit-task.component';
import { ArchiveComponent } from './components/dialogs/archive/archive.component';
import { DeleteComponent } from './components/dialogs/delete/delete.component';
import { EditListComponent } from './components/dialogs/edit-list/edit-list.component';
import { ArchivedListsComponent } from './components/dialogs/archived-lists/archived-lists.component';
import { InitialPipe } from './pipes/initial.pipe';
import { ArchivedTasksComponent } from './components/dialogs/archived-tasks/archived-tasks.component';
import { Header2Component } from './components/layout/header2/header2.component';
import { UploadJsonComponent } from './components/dialogs/upload-json/upload-json.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



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
    DialogContentExampleDialog,
    CreateTaskComponent,
    CreateListComponent,
    CreateTaskComponent,
    EditBoardComponent,
    AddUsersComponent,
    CalendarComponent,
    EditTaskComponent,
    ArchiveComponent,
    DeleteComponent,
    EditListComponent,
    ArchivedListsComponent,
    InitialPipe,
    ArchivedTasksComponent,
    Header2Component,
    UploadJsonComponent
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
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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
