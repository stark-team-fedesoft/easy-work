import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactoryService } from 'src/app/services/factory.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  taskList: any;
  loading = false;
  taskCreated: any;

  constructor(
    public dialogRef: MatDialogRef<CreateListComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    private factory: FactoryService,
  ) {
    this.taskList = {};
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  private clearData() {
    this.taskList = {
      is_archived: false,
      list_id: this.data.list._id,
      board_id: this.data.board._id,
      color: this.data.color,
      name: '',
      priority: 1,
    };
  }

  create(ev: Event) {
    ev.preventDefault();

    if ( !this.taskList.name ) {
      return this.snackSvc.opensnack('Ingrese un nombre valido');
    }

    this.loading = true;
    this.factory.post('api/task', this.taskList).subscribe(
      (res: any) => {
        this.loading = false;
        this.taskCreated = res.data;
        this.clearData();
        this.onNoClick();
      },
      (err: any) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    );
  }

}
