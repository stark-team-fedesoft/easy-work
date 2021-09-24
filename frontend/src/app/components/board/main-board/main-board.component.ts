import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastService } from 'src/app/services/toast.service';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivitiesService } from 'src/app/services/activities.service';

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
  opened=false;
  showFiller = false;
  idBoard : string;
  activiadad: any = "";
  registerActivity: { idBoard: any; description: any; };

  colorCtr: AbstractControl = new FormControl(null);
  colorCtrUpdate: AbstractControl = new FormControl(null);

  constructor(
    private factory: FactoryService,
    private toast: ToastService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private activityService: ActivitiesService,
  ) {
    this.taskData = {};
    this.registerList = {};
    this.registerTask = {};
    this.env = environment;
    this.board = {
      _id: '613bd32f864bca0a68a8644b',
      name: 'Board 1',
      imageBackUrl: this.env.uploadURL + 'img/boards/' + 'defaultImgBack.jpg',
    };
    this.listTask = [];
    this.board._id = this.router.snapshot.paramMap.get('board_id');
    this.idBoard = this.board._id;
  }

  ngOnInit(): void {
    this.loadBoard();
    this.loadLists();
  }
  loadBoard(): void {
    this.factory
      .getAll('api/board/get/' + this.board._id)
      .subscribe((res: any) => {
        // console.log('Board', res);
        this.board = res.data;
        if (this.board.imageBackUrl === 'defaultImgBack.jpg') {
          this.board.imageBackUrl =
            this.env.uploadURL + 'img/boards/' + this.board.imageBackUrl;
        }
      });
  }
  loadLists(): void {
    this.factory.getAll('api/tasks-list/list/' + this.board._id).subscribe(
      (res: any) => {
        this.listTask = res.data;
        // // console.log('lista de tareas', this.listTask);
        this.listTask.forEach((element: any) => {
          this.cargarTasks(element);
        });
      },
      (err: any) => {
        this.toast.message = err.error;
        this.toast.openSnackBarError();
      }
    );
  }
  cargarTasks(list: any): void {
    if (!list) { return; }
    this.factory.getAll('api/tasks/list/' + list._id).subscribe(
      (res: any) => {
        // // console.log('Tareas', res);
        list.tasks = res.data;
      },
      (err: any) => {
        this.toast.message = err.error;
        this.toast.openSnackBarError();
      }
    );
  }

  updateTask(task: any, indice: any, indicePre?: any) {
    const templist = task.list_id;
    // console.log('Lista temporal', templist);
    task.list_id = this.listTask[indice]._id;
    // console.log(task);
    this.factory.update('api/tasks/update', task).subscribe(
      (res: any) => {
        task.list_id = this.listTask[indice]._id;
        /* this.cargarLists(); */
        /* this.cargarTasks(templist); */
        this.cargarTasks(this.listTask[indicePre]);
        this.cargarTasks(this.listTask[indice]);
      },
      (err: any) => {
        task.list_id = templist;
        // console.log(err);
        this.toast.message = err.error;
        this.toast.openSnackBarError();
      }
    );
  }

  deleteTask(task: any, indice: any) {
    this.factory.delete('api/tasks/delete/' + task._id, task).subscribe(
      (res: any) => {
        const index = this.listTask[indice].tasks.indexOf(task);
        this.activiadad = ' eliminado tarea ' + task.name + "   " + this.getFecha();
            
            this.registerActivity = {
              idBoard: this.idBoard,
              description: this.activiadad,
            };
            this.activityService
              .registerActivity(this.registerActivity)
              .subscribe(
                (res2) => {
                  console.log('se guardo actividad borrado de tarea');
                },
                (err2) => {
                  console.log('no se guardo actividad borrar');
                
                }
              );
        
        if (index > -1) {
          this.listTask[indice].tasks.splice(index, 1);
          this.toast.message = res.message;
          this.toast.openSnackBarSuccesfull();
        }
      },
      (err: any) => {
        this.toast.message = err.error;
        this.toast.openSnackBarError();
      }
    );
  }
  dropList(event: CdkDragDrop<string[]>, list?: any) {
    moveItemInArray(this.listTask, event.previousIndex, event.currentIndex);
  }
  drop(event: CdkDragDrop<string[]>, list?: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateTask(event.container.data[event.currentIndex], list);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  selectList(list: any, action: string, indice?: any) {
    this.registerList = list;
    this.registerList.action = action;
    this.registerList.priority = indice;
    // console.log(indice);
  }
  saveList(): void {
    if (!this.registerList.name) {
      this.toast.message = 'Datos incompletos';
      this.toast.openSnackBarError();
    }
    if (this.registerList.action === 'update') {
      return this.updateList();
    }
    this.registerList.color = this.colorCtr.value?.hex;
    this.registerList.board_id = this.board._id;
    this.factory.post('api/tasks-list/create', this.registerList).subscribe(
      (res: any) => {
        this.loadLists();
        // console.log('Register list', res);
        this.toast.message = 'Registro exitoso';
        this.toast.openSnackBarSuccesfull();
      },
      (err: any) => {
        this.toast.message = err.error;
        this.toast.openSnackBarError();
      }
    );
  }
  updateList(): any {
    this.registerList.color = this.colorCtr.value?.hex;
    this.registerList.board_id = this.board._id;
    this.factory.update('api/tasks-list/update', this.registerList).subscribe(
      (res: any) => {
        this.loadLists();
        // console.log('Update list', res);
        this.toast.message = 'Actualizacion exitoso';
        this.toast.openSnackBarSuccesfull();
      },
      (err: any) => {
        this.toast.message = err.error;
        this.toast.openSnackBarError();
      }
    );
  }
  selectNewTask(id: any) {
    this.registerTask.list_id = id;
  }
  newTask() {
    this.factory.post('api/tasks/create', this.registerTask).subscribe(
      (res: any) => {
        this.loadLists();
        console.log('Create task', res);
        
        this.activiadad=" creado tarea " + res.data.name + "   " + this.getFecha();
        console.log(this.activiadad);
        this.registerActivity = {
          idBoard:this.board._id ,
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
        
        // console.log('Create task', res);
        this.toast.message = 'Registro exitoso';
        this.toast.openSnackBarSuccesfull();
        console.log("se creo tarea test 1_1");
       

        
      },
      (err: any) => {
        this.toast.message = err.error;
        this.toast.openSnackBarError();
      }
    );
  }
  deleteList(indice: any): void {
    // console.log('Eliminar', this.listTask[indice].tasks);
    if (this.listTask[indice].tasks.length > 0) {
      Swal.fire(
        '¡Lista con elementos!',
        'La lista que desea eliminar tiene elementos',
        'warning'
      );
    }
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Seguro que desea eliminar la lista!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.factory
          .delete('api/tasks-list/delete/' + this.listTask[indice]._id)
          .subscribe(
            (res: any) => {
              this.loadLists();
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            },
            (err: any) => {
              Swal.fire('Error', err.message);
            }
          );
      }
    });
  }

  getFecha(){
    let date =new Date();
    let anio = date.getFullYear();
    let mes = date.getMonth() + 1;
    let dia = date.getDate();
    let hora = date.getHours() + ":" + date.getMinutes();
    return anio + "/" + mes + "/"+ dia +":" + hora;
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: AbstractControl = new FormControl(null);
}
