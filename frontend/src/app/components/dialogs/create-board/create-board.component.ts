import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardI } from 'src/app/interfaces/board';
import { BoardService } from 'src/app/services/board.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent {

  board: BoardI;
  loading = false;
  boardCreated: BoardI;

  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    private snackSvc: SnackbarService,
    private boardSvc: BoardService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.clearData();
  }

  ngOnInit(): void {
  }

  private clearData(): void {
    this.board = {
      name: '',
      status: true,
      workspace_id: this.data.workspace_id,
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createBoard(ev:Event): void {
    ev.preventDefault();
    if( !this.board.name ) return this.snackSvc.opensnack('Ingrese el nombre del tablero');

    this.loading = true;
    this.boardSvc.create(this.board).subscribe(
      (res: any) => {
        this.loading = false;
        this.boardCreated = res.data;
        this.onNoClick();

      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
