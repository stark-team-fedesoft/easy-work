import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from 'src/app/interfaces/task';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-archive-task',
  templateUrl: './archive-task.component.html',
  styleUrls: ['./archive-task.component.scss']
})
export class ArchiveTaskComponent implements OnInit {

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<ArchiveTaskComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public task: TaskI,
    private taskSvc: TasksService,
  ) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleArchiveTask() {
    this.loading = true;

    const end_date = this.task.end_date;

    const end_date_str = end_date.substring(0, 10);
    
    const payload: TaskI = {
      ...this.task,
      is_archived : !this.task.is_archived,
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

}
