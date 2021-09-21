import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListI } from 'src/app/interfaces/list';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<EditListComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public list: ListI,
    private listSvc: ListsService,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateList(ev: Event): void {
    ev.preventDefault();
    
    if( !this.list.name ) return this.snackSvc.opensnack('Ingrese un nombre valido');
    
    this.loading = true;
    this.listSvc.update(this.list).subscribe(
      (res: any) => {
        this.loading = false;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
