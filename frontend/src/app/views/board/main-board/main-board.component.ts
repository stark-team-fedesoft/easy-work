import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ToastService } from 'src/app/services/toast.service';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private _factory: FactoryService,
    private _toast: ToastService
  ) {
    this.taskData = {};
    this.env = environment;
    this.board = {
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

  updateTask(task: any, indice: any) {
    let templist = task.list_id;
    console.log('Lista temporal',templist);
    task.list_id = this.listTask[indice]._id;
    console.log(task);
    this._factory.update('api/tasks/update', task).subscribe(
      (res: any) => {
        task.list_id = this.listTask[indice]._id;
        this.cargarLists();
        /* this.cargarTasks(templist);
        this.cargarTasks(this.listTask[indice]); */
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
}