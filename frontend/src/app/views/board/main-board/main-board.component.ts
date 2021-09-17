import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ToastService } from 'src/app/services/toast.service';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
})
export class MainBoardComponent implements OnInit {
  taskData: any;
  listTask: any;
  board: any;
  env: any;
  registerList: any;
  registerTask: any;
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  public disabledU = false;
  public colorU: ThemePalette = 'primary';
  public touchUiU = false;

  colorCtr: AbstractControl = new FormControl(null);
  colorCtrUpdate: AbstractControl = new FormControl(null);

  constructor(
    private _factory: FactoryService,
    private _toast: ToastService,
    public dialog: MatDialog
  ) {
    this.taskData = {};
    this.registerList = {};
    this.registerTask = {};
    this.env = environment;
    this.board = {
      _id: '613bd32f864bca0a68a8644b',
      name: 'Board 1',
      imageBackUrl: this.env.uploadURL + 'img/boards/' + 'defaultImgBack.jpg'
    };
    this.listTask = [];
  }

  ngOnInit(): void {
    this.cargarLists();
  }
  cargarLists(): void {
    this._factory.getAll('api/tasks-list/list').subscribe(
      (res: any) => {
        this.listTask = res.data;
        console.log('lista de tareas', this.listTask);
        this.listTask.forEach((element: any) => {
          this.cargarTasks(element);
        });
        console.log('Tareas finales', this.listTask);
      },
      (err: any) => {
        this._toast.message = err.error;
        this._toast.openSnackBarError();
      }
    );
  }
  cargarTasks(list: any): void {
    this._factory.getAll('api/tasks/list/' + list._id).subscribe(
      (res: any) => {
        console.log('Tareas', res);
        list.tasks = res.data;
      },
      (err: any) => {
        this._toast.message = err.error;
        this._toast.openSnackBarError();
      }
    );
  }

  updateTask(task: any, indice: any, indicePre?: any) {
    let templist = task.list_id;
    console.log('Lista temporal',templist);
    task.list_id = this.listTask[indice]._id;
    console.log(task);
    this._factory.update('api/tasks/update', task).subscribe(
      (res: any) => {
        task.list_id = this.listTask[indice]._id;
        /* this.cargarLists(); */
        /* this.cargarTasks(templist); */
        this.cargarTasks(this.listTask[indicePre]);
        this.cargarTasks(this.listTask[indice]);
      },
      (err: any) => {
        task.list_id = templist;
        console.log(err);
        this._toast.message = err.error;
        this._toast.openSnackBarError();
      }
    );
  }

  deleteTask(task: any, indice: any) {
    this._factory.delete('api/tasks/delete/' + task._id, task).subscribe(
      (res: any) => {
        let index = this.listTask[indice].tasks.indexOf(task);
        if (index > -1) {
          this.listTask[indice].tasks.splice(index, 1);
          this._toast.message = res.message;
          this._toast.openSnackBarSuccesfull();
        }
      },
      (err: any) => {
        this._toast.message = err.error;
        this._toast.openSnackBarError();
      }
    );
  }
  drop(event: CdkDragDrop<string[]>, list?: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateTask(event.container.data[event.currentIndex], list);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  selectList(list: any, action: string) {
    this.registerList = list;
    this.registerList.action = action;
  }
  saveList(): void {
    if(!this.registerList.name) {
      this._toast.message = 'Datos incompletos';
      this._toast.openSnackBarError();
    }
    if(this.registerList.action === 'update') {
      return this.updateList();
    }
    this.registerList.color = this.colorCtr.value?.hex;
    this.registerList.board_id = this.board._id;
    this._factory.post('api/tasks-list/create', this.registerList).subscribe(
      (res: any) => {
        this.cargarLists();
        console.log('Register list', res);
        this._toast.message = 'Registro exitoso';
        this._toast.openSnackBarSuccesfull();
      },
      (err: any) => {
        this._toast.message = err.error;
        this._toast.openSnackBarError();
      }
    );
  }
  updateList(): any {
    this.registerList.color = this.colorCtr.value?.hex;
    this.registerList.board_id = this.board._id;
    this._factory.update('api/tasks-list/update', this.registerList).subscribe(
      (res: any) => {
        this.cargarLists();
        console.log('Update list', res);
        this._toast.message = 'Actualizacion exitoso';
        this._toast.openSnackBarSuccesfull();
      },
      (err: any) => {
        this._toast.message = err.error;
        this._toast.openSnackBarError();
      }
    );
  }
  selectNewTask(id: any) {
    this.registerTask.list_id = id;
  }
  newTask() {
    this._factory.post('api/tasks/create', this.registerTask).subscribe(
      (res: any) => {
        this.cargarLists();
        console.log('Create task', res);
        this._toast.message = 'Registro exitoso';
        this._toast.openSnackBarSuccesfull();
      },
      (err: any) => {
        this._toast.message = err.error;
        this._toast.openSnackBarError();
      }
    );
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: AbstractControl = new FormControl(null);
}