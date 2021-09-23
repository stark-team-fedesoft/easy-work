import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListI } from 'src/app/interfaces/list';
import { TaskI } from 'src/app/interfaces/task';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.scss']
})
export class UploadJsonComponent implements OnInit {

  loading = false;
  errs = 0;

  constructor(
    public dialogRef: MatDialogRef<UploadJsonComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    private taskSvc: TasksService,
    private listSvc: ListsService,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileInput(ev: Event) {
    const file = ev.srcElement['files'][0];
    const fileName = file.name;
    const fileExt = fileName.substring(fileName.lastIndexOf('.'));
    const reader = new FileReader();
    const self = this;

    if( fileExt !== '.json' ) return this.snackSvc.opensnack('Archivos JSON solamente');
    
    reader.readAsText(file);
    
    reader.onload = function(e) {
      const result = e.currentTarget['result'];
      const data = JSON.parse( result);

      // comprobar si es el formato correcto
      if( !data.hasOwnProperty('name') && !data.hasOwnProperty('lists') ) return self.snackSvc.opensnack('Formato invalido');
      
      self.uploadLists(data.lists);
      self.loading = true;

      setTimeout(() => {
        self.snackSvc.opensnack(`Se ha completado la craga del archivo con ${ self.errs } errores`);
        self.loading = false,
        self.onNoClick();
      }, 5000);
    }
    
  }

  private uploadLists( lists: ListI[] ): void {
    lists.forEach((list: ListI) => {
      const payload: ListI = {
        ...list,
        board_id: this.data.board_id,
      }

      this.listSvc.create(payload).subscribe(
        (res: any) => {
          const listCreated: ListI = res.data;
          
          this.uploadTasks(list.tasks, listCreated._id);

        },
        (err: HttpErrorResponse) => {
          this.snackSvc.opensnack(err.error);
          this.errs += 1;
        }
      )
    });
  }

  private uploadTasks( tasks: TaskI[], list_id: string ): void {
    tasks.forEach((task: TaskI) => {
      const newTask: TaskI = {
        ...task,
        list_id,
        end_date : task.end_date.substring(0, 10),
      }

      this.taskSvc.create(newTask).subscribe(
        (res: any) => {
          
        },
        (err: HttpErrorResponse) => {
          this.snackSvc.opensnack(err.error);
          this.errs += 1;
        }
      );
    });
  }

}
