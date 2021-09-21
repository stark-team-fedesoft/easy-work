import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from 'src/app/interfaces/task';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  task: TaskI;
  loading = false;
  taskCreated: TaskI;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    private taskSvc: TasksService,
  ) {
    this.clearData();
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private clearData() {
    const now = new Date();
    const end = now.setDate(now.getDate() + 30); // thirty expiration dates
    const end_obj = new Date( new Date(end) );

    this.task = {
      is_archived: false,
      list_id: this.data.list._id,
      name: '',
      priority: 1,
      end_date: end_obj,
    }
  }

  createTask(ev: Event) {
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
    this.taskSvc.create(this.task).subscribe(
      (res: any) => {
        this.loading = false;
        this.taskCreated = res.data;
        this.clearData();
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    );
  }

}
