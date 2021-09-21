import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from 'src/app/interfaces/task';
import { BoardService } from 'src/app/services/board.service';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    private taskSvc: TasksService,
    private listSvc: ListsService,
    private boardSvc: BoardService,
  ) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    if( this.data.module === 'tasks' ) this.deleteTask();
    if( this.data.module === 'lists' ) this.deleteList();
    if( this.data.module === 'boards' ) this.deleteBoard();
  }

  private deleteTask():void {
    this.loading = true;
    this.taskSvc.delete(this.data.data._id).subscribe(
      (res: any) => {
        this.loading = false;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  private deleteList():void {
    this.loading = true;
    this.listSvc.delete(this.data.data._id).subscribe(
      (res: any) => {
        this.loading = false;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  private deleteBoard():void {
    this.loading = true;
    this.boardSvc.delete(this.data.data._id).subscribe(
      (res: any) => {
        this.loading = false;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
