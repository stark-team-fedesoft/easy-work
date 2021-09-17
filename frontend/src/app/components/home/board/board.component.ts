import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ListI } from 'src/app/interfaces/list';
import { TaskI } from 'src/app/interfaces/task';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';
import { CreateTaskComponent } from '../../dialogs/create-task/create-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  newList: ListI;
  boardId: string;
  lists: ListI[] = [];
  showForm = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private listSvc: ListsService,
    private taskSvc: TasksService,
    private snackSvc: SnackbarService,
    public dialog: MatDialog,
  ) {
    this.route.params.subscribe((val) => {
      this.boardId = val.board_id;
      this.clearData();
    });
    this.getLists();
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskPriority(event.previousContainer.data[0]['list_id']);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      this.updateTaskPriority(
        event.previousContainer.element.nativeElement.id.substring(5),
        event.container.element.nativeElement.id.substring(5),
        event.currentIndex,
      );
         
    }
  }

  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    this.updateListPriority();
  }

  private clearData() {
    this.newList = {
      name: '',
      is_archived: false,
      board_id: this.boardId,
      loading: false
    }
  }

  createList(ev: Event):void {
    ev.preventDefault();

    if( !this.newList.name ) return this.snackSvc.opensnack('Ingrese un nombre valido');

    this.loading = true;
    this.listSvc.create(this.newList).subscribe(
      (res: any) => {
        this.loading = false;
        this.showForm = false;
        this.getLists();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  private getLists() {
    this.loading = true;
    this.listSvc.list(this.boardId).subscribe(
      (res: any) => {
        this.loading = false;
        this.lists = res.data;
        this.getTasksOfList();
      },
      (err: HttpErrorResponse) => {
        this.snackSvc.opensnack(err.error);
        this.loading = false;
      }
    )
  }

  openCrateTaskDialog( list: ListI ): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '30%',
      data: { list },
    });

    dialogRef.afterClosed().subscribe( res => {
      this.getLists();
    });
  }

  private getTasks(list_id: string) {
    const list = this.lists.find(li => li._id === list_id);    
    list.loading = true;

    this.taskSvc.list(list_id).subscribe(
      (res) => {
        list.tasks = res.data;
        list.loading = false;

      },
      (err: HttpErrorResponse) => {
        list.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
    
  }

  private getTasksOfList(): void {
    this.lists.forEach(list => {
      this.getTasks(list._id);
    });
  }

  getDifferentList( list_id: string ): string[] {
    const res = [];
    const diff = this.lists.filter( li => li._id !== list_id );
    
    diff.forEach( d => {
      res.push(`list-${ d._id }`);
    });

    return res;
  }

  private updateTaskPriority(list_id: string, list_id2?: string, next_i?: number) {
    const list  = this.lists.find(list => list._id === list_id);
    const tasks = list.tasks;
    
    tasks.forEach((task, index) => {
      const newTask: TaskI = {
        ...task,
        priority : index + 1,
        end_date : task.end_date.substring(0, 10),
      }
      this.updateTask(newTask);
      
    });
    
    if( !list_id2 ) return;
    
    const list2  = this.lists.find(list => list._id === list_id2);
    
    const tasks2 = list2.tasks;
    const task = tasks2[next_i];

    task.list_id = list2._id;

    tasks2.forEach((task, index) => {
      const newTask: TaskI = {
        ...task,
        priority : index + 1,
        end_date : task.end_date.substring(0, 10),
      }
      this.updateTask(newTask);
    });
    
  }

  private updateTask(task: TaskI) {
    this.loading = true;
    this.taskSvc.update(task).subscribe(
      (res: any) => {
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  controlScroll(dir: string): void {
    let listTasks = document.getElementById('list-tasks');

    if( dir === "right" ) listTasks.scrollLeft += 20;
    if( dir === "left" ) listTasks.scrollLeft -= 20;
    console.log(listTasks.scrollWidth);
    
  }

  private updateListPriority() {
    this.lists.forEach((list, index) => {
      const newList: ListI = {
        ...list,
        priority: index + 1,
      }
      this.uupdateList(newList);
    });
  }

  private uupdateList(list: ListI): void {
    this.loading = true;
    this.listSvc.update(list).subscribe(
      (res: any) => {
        this.loading = false;
        // this.getLists();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
