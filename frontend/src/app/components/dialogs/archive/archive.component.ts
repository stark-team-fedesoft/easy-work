import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListI } from 'src/app/interfaces/list';
import { TaskI } from 'src/app/interfaces/task';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-archive-task',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<ArchiveComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskSvc: TasksService,
    private listSvc: ListsService,
  ) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  archive() {
    if( this.data.module === 'tasks' ) return this.toggleArchiveTask();
    if( this.data.module === 'lists' ) return this.toggleArchiveList();
  }

  toggleArchiveTask(): void {
    this.loading = true;

    const end_date = this.data.data.end_date;

    const end_date_str = end_date.substring(0, 10);
    
    const payload: TaskI = {
      ...this.data.data,
      is_archived : !this.data.data.is_archived,
      end_date    : end_date_str,
    }

    this.taskSvc.update(payload).subscribe(
      (res:any) => {
        this.loading = false;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )

  }

  toggleArchiveList():void {
    this.loading = true;
    
    const payload: ListI = {
      ...this.data.data,
      is_archived : !this.data.data.is_archived,
    }

    this.listSvc.update(payload).subscribe(
      (res:any) => {
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
