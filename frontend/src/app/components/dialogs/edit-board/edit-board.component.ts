import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardI } from 'src/app/interfaces/board';
import { BoardService } from 'src/app/services/board.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WallpaperService } from 'src/app/services/wallpaper.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit {

  loading = false;
  query = 'art';
  wallpapers: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditBoardComponent>,
    private snackSvc: SnackbarService,
    private boardSvc: BoardService,
    private wallpaperSvc: WallpaperService,
    @Inject(MAT_DIALOG_DATA) public data: BoardI
  ) {
    this.getWallpapers();
  }

  ngOnInit(): void {
  }

  updateBoard(ev: Event) {
    ev.preventDefault();
    
    if( !this.data.name ) return this.snackSvc.opensnack('Ingrese un nombre valido');

    this.loading = true;
    this.boardSvc.update(this.data).subscribe(
      (res: any) => {
        this.loading = false;
        this.onNoClick();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    );
    
  }

  getWallpapers() {
    this.loading = true;
    this.wallpaperSvc.list(this.query).subscribe(
      (res: any) => {
        this.loading = false;
        this.wallpapers = res.data;

      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);

      }
    )
  }

  setBodyBackground(src: string): void {
    document.body.style.backgroundImage = `url(${ src })`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
