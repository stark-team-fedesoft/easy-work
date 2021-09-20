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
    this.task = {
      is_archived: false,
      list_id: this.data.list._id,
      name: '',
      priority: 1,
    }
  }

  createTask(ev: Event) {
    ev.preventDefault();

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
