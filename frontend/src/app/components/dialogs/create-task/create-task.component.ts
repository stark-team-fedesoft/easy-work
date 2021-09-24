import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from 'src/app/interfaces/task';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  task: TaskI;
  loading = false;
  taskCreated: TaskI;
  idBoard : string;
  activiadad: any = "";
  registerActivity: { idBoard: any; description: any; };

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    private taskSvc: TasksService,
    private activityService: ActivitiesService,
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

    const payload = {
      ...this.task,
      end_date : end_date_str,
    }

    this.taskSvc.create( payload ).subscribe(
      (res: any) => {
        this.loading = false;
        this.taskCreated = res.data;
        let date =new Date();
        let anio = date.getFullYear();
        let mes = date.getMonth() + 1;
        let dia = date.getDate();

        let dd = "AM";
        let hh =date.getHours();
        let h = hh;
          if (h >= 12) {
            h = hh - 12;
            dd = "PM";
          }
          if (h == 0) {
            h = 12;
          }
        let hour = h + ":" + date.getMinutes() + " " + dd;

        this.activiadad=" creado tarea " + res.data.name + "  en la fecha " + anio + "/" + mes + "/"+ dia +" :" + hour;
        console.log(this.activiadad);
        this.registerActivity = {
          idBoard:this.data.list.board_id ,
          description: this.activiadad,
        };
        this.activityService
              .registerActivity(this.registerActivity)
              .subscribe(
                (res2) => {
                  console.log('se guardo actividad');
                },
                (err2) => {
                  console.log('no se guardo actividad');
                  console.log(err2.error);
                }
              );
      
        
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
