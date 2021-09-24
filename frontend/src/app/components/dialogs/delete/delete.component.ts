import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskI } from 'src/app/interfaces/task';
import { WorkspaceI } from 'src/app/interfaces/workspace';
import { BoardService } from 'src/app/services/board.service';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';
import { WorkspacesService } from 'src/app/services/workspaces.service';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  loading = false;
  deleted_id: string = '';
  actividad: any = "";
  registerActivity: { idBoard: any; description: any; };

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    private taskSvc: TasksService,
    private listSvc: ListsService,
    private boardSvc: BoardService,
    private spaceSvc: WorkspacesService,
    private activityService: ActivitiesService,
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
    if( this.data.module === 'workspaces' ) this.deleteWorkspace();
  }

  private deleteTask():void {
    this.loading = true;
    this.taskSvc.delete(this.data.data._id).subscribe(
      (res: any) => {
        this.loading = false;
        this.deleted_id = this.data.data._id;  
         this.actividad=" eliminado tarea " + this.data.data.name + "  en la fecha " + this.getFecha();
       
        this.registerActivity = {
          idBoard:this.data.board_id ,
          description: this.actividad,
        };
        this.activityService
              .registerActivity(this.registerActivity)
              .subscribe(
                (res2) => {
                  
                },
                (err2) => {
                 
                }
              );
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
       
        this.actividad=" eliminado lista " + this.data.data.name + "  en la fecha " + this.getFecha();
       
        this.registerActivity = {
          idBoard:this.data.board_id ,
          description: this.actividad,
        };
        this.activityService
              .registerActivity(this.registerActivity)
              .subscribe(
                (res2) => {
                  
                },
                (err2) => {
                 
                }
              );
        this.deleted_id = this.data.data._id;
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
        this.deleted_id = this.data.data._id;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  private deleteWorkspace():void {
    this.loading = true;
    this.spaceSvc.delete(this.data.data._id).subscribe(
      (res: any) => {
        this.loading = false;
        this.deleted_id = this.data.data._id;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  getFecha(){
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
    return anio + "/" + mes + "/"+ dia +":" + hour;
  }


}
