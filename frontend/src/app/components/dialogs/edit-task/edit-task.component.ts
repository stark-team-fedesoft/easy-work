import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from 'src/app/interfaces/task';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
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

  updateTask(ev: Event): void {
    ev.preventDefault();

    const now = new Date();
    const end_date = this.task.end_date;

    const currTimestamp = now.getTime();
    const endTimestamp = end_date.getTime();

    if( endTimestamp < currTimestamp )
      return this.snackSvc.opensnack('Seleccione una fecha superior a la actual');    

    const year  = end_date.getFullYear();
    const month = end_date.getMonth() + 1;
    const day   = end_date.getDate();
    
    const monthStr = month < 10 ? `0${ month }` : month;
    const dayStr   = day < 10 ? `0${ day }` : day;

    const end_date_str = `${ year }-${ monthStr }-${ dayStr }`;

    if( !this.task.name ) return this.snackSvc.opensnack('Ingrese un nombre valido');

    this.loading = true;

    const payload = {
      ...this.task,
      end_date : end_date_str,
    }

    this.taskSvc.update( payload ).subscribe(
      (res: any) => {
        this.loading = false;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    );
  }

}
