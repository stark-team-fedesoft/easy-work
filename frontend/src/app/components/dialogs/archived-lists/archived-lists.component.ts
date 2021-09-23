import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListI } from 'src/app/interfaces/list';
import { TaskI } from 'src/app/interfaces/task';
import { ListsService } from 'src/app/services/lists.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ArchiveComponent } from '../archive/archive.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditListComponent } from '../edit-list/edit-list.component';

@Component({
  selector: 'app-archived-lists',
  templateUrl: './archived-lists.component.html',
  styleUrls: ['./archived-lists.component.scss']
})
export class ArchivedListsComponent implements OnInit {

  loading = false;
  lists: ListI[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditListComponent>,
    private snackSvc: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
    private listSvc: ListsService,
    public dialog: MatDialog,
  ) {
    this.getLists();
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getLists(): void {
    this.loading = true;
    this.listSvc.listArchived(this.data.board_id).subscribe(
      (res: any) => {
        this.loading = false;
        this.lists = res.data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
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

  openDeleteDialog(module: string, data: TaskI): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '30%',
      data: { module, data },
    });

    dialogRef.afterClosed().subscribe( res => {
      this.getLists();
    });
  }

}
