import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardI } from 'src/app/interfaces/board';
import { ListI } from 'src/app/interfaces/list';
import { TaskI } from 'src/app/interfaces/task';
import { BoardService } from 'src/app/services/board.service';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TasksService } from 'src/app/services/tasks.service';
import { AddUsersComponent } from '../../dialogs/add-users/add-users.component';
import { ArchiveComponent } from '../../dialogs/archive/archive.component';
import { ArchivedListsComponent } from '../../dialogs/archived-lists/archived-lists.component';
import { ArchivedTasksComponent } from '../../dialogs/archived-tasks/archived-tasks.component';
import { CreateTaskComponent } from '../../dialogs/create-task/create-task.component';
import { DeleteComponent } from '../../dialogs/delete/delete.component';
import { EditBoardComponent } from '../../dialogs/edit-board/edit-board.component';
import { EditListComponent } from '../../dialogs/edit-list/edit-list.component';
import { EditTaskComponent } from '../../dialogs/edit-task/edit-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  newList: ListI;
  board: BoardI;
  lists: ListI[] = [];
  showForm = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listSvc: ListsService,
    private taskSvc: TasksService,
    private boardSvc: BoardService,
    private snackSvc: SnackbarService,
    public dialog: MatDialog,
  ) {
    this.clearBoardData();
    this.route.params.subscribe((val) => {
      this.getBoard(val.board_id);
    });
    
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    document.body.style.backgroundImage = "url()";
  }

  private getBoard( board_id: string ): void {
    this.loading = true;
    this.boardSvc.getById(board_id).subscribe(
      (res: any) => {
        this.loading = false;
        this.board = res.data;
        this.clearData();
        this.getLists();
        this.setBodyImage(this.board.imageBackUrl);
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  private setBodyImage(src: string): void {
    document.body.style.backgroundImage = `url(${ src })`;
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
      board_id: this.board._id,
      loading: false
    }
  }

  private clearBoardData(): void {
    this.board = {
      name: '',
      status: true,
      workspace_id: '',
    }
  };

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
    this.listSvc.list(this.board._id).subscribe(
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

  openEditBoardDialog(): void {
    const dialogRef = this.dialog.open(EditBoardComponent, {
      width: '50%',
      height: '70%',
      data: this.board ,
    });

    dialogRef.afterClosed().subscribe( res => {
      
    });
  }

  openAddUsersDialog(): void {
    const dialogRef = this.dialog.open(AddUsersComponent, {
      width: '50%',
      height: '70%',
      data: this.board,
    });

    dialogRef.afterClosed().subscribe( res => {
      
    });
  }

  openEditTaskDialog(task: TaskI): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '50%',
      data: task,
    });

    dialogRef.afterClosed().subscribe( res => {
      
    });
  }

  openArchiveDialog(module: string, data: TaskI | ListI): void {
    const dialogRef = this.dialog.open(ArchiveComponent, {
      width: '30%',
      data: { module, data },
    });

    dialogRef.afterClosed().subscribe( res => {
      this.getLists();
    });
  }

  openDeleteDialog(module: string, data: TaskI | BoardI): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '30%',
      data: { module, data },
    });

    dialogRef.afterClosed().subscribe( res => {
      if(module === 'boards') return this.router.navigate([`/home/${ this.board.workspace_id }`]);
      this.getLists();
    });
  }

  openEditListDialog(list: ListI): void {
    const dialogRef = this.dialog.open(EditListComponent, {
      width: '30%',
      data: list,
    });

    dialogRef.afterClosed().subscribe( res => {
      
    });
  }

  openArchivedListsDialog(): void {
    const dialogRef = this.dialog.open(ArchivedListsComponent, {
      width: '30%',
      data: { board_id: this.board._id },
    });

    dialogRef.afterClosed().subscribe( res => {
      this.getLists();
    });
  }

  openArchivedTasksDialog(): void {
    const dialogRef = this.dialog.open(ArchivedTasksComponent, {
      width: '30%',
      data: { board_id: this.board._id },
    });

    dialogRef.afterClosed().subscribe( res => {
      this.getLists();
    });
  }

  exportInJSON(): void {
    this.loading = true;

    const lists = this.lists.map((list: ListI) => {
      const tasks = list.tasks.map((task: TaskI) => {
        return {
          name        : task.name,
          description : task.description,
          end_date    : task.end_date,
          is_archived : task.is_archived,
          priority    : task.priority,
        }
      });

      return {
        name : list.name,
        is_archived : list.is_archived,
        priority : list.priority,
        tasks,
      }
    });

    const board = {
      name         : this.board.name,
      description  : this.board.description,
      date         : this.board.date,
      imageBackUrl : this.board.imageBackUrl,
      status       : this.board.status,
      lists,
    }
    
    const data = `text/json;charset=utf-8,${ encodeURIComponent(JSON.stringify(board))}`;
    const link = document.createElement('a');

    link.href = `data:${ data }`;
    link.download = 'data.json';

    link.click();
    link.remove();
    
    this.loading = false;
    
  }
}
