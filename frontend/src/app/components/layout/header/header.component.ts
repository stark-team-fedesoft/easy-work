
import { AuthService } from 'src/app/services/auth.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardI } from 'src/app/interfaces/board';
import { ListI } from 'src/app/interfaces/list';
import { UserI } from 'src/app/interfaces/user';
import { BoardService } from 'src/app/services/board.service';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';
import { environment } from 'src/environments/environment';
import { AddUsersComponent } from '../../dialogs/add-users/add-users.component';
import { ArchiveComponent } from '../../dialogs/archive/archive.component';
import { ArchivedListsComponent } from '../../dialogs/archived-lists/archived-lists.component';
import { ArchivedTasksComponent } from '../../dialogs/archived-tasks/archived-tasks.component';
import { CreateTaskComponent } from '../../dialogs/create-task/create-task.component';
import { DeleteComponent } from '../../dialogs/delete/delete.component';
import { EditBoardComponent } from '../../dialogs/edit-board/edit-board.component';
import { EditListComponent } from '../../dialogs/edit-list/edit-list.component';
import { EditTaskComponent } from '../../dialogs/edit-task/edit-task.component';
import { UploadJsonComponent } from '../../dialogs/upload-json/upload-json.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  users: UserI[];
  user: UserI = {
    _id: '',
    name: '',
    email: '',
    password: ''
  };
  constructor(
    private authSvc: AuthService,
    private snackSvc: SnackbarService,
    public dialog: MatDialog
  ) {
    // this.isLoggedIn = this.authSvc.isLoggedIn();
  }

  ngOnInit(): void {
  }

  get isLoggedIn() {
    return this.authSvc.isLoggedIn();
  }

  logout(): void {
    this.authSvc.logout();
  }

  get isAdmin() {
    return this.authSvc.isAdmin();
  }

  openArchiveDialog(module: string, data: UserI | ListI): void {
    const dialogRef = this.dialog.open(ArchiveComponent, {
      width: '30%',
      data: { module, data },
    });

  }

  getUsers() {
    this.authSvc.list().subscribe(
      (res: any) => {
        this.users = res.data;
      },
      (err: HttpErrorResponse) => {
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
