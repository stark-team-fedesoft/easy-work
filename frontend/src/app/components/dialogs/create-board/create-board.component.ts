import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardI } from 'src/app/interfaces/board';
import { ActivitiesService } from 'src/app/services/activities.service';
import { BoardService } from 'src/app/services/board.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WallpaperService } from 'src/app/services/wallpaper.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  board: BoardI;
  loading = false;
  boardCreated: BoardI;
  query = 'nature';
  wallpapers: any[] = [];
  activiadad: any = {};
  registerActivity: { idBoard: any; description: any; };
  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    private snackSvc: SnackbarService,
    private boardSvc: BoardService,
    private wallpaperSvc: WallpaperService,
    private activityService: ActivitiesService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.clearData();
    this.getWallpapers();
  }

  getWallpapers(): void {
    this.loading = true;
    this.wallpaperSvc.list(this.query).subscribe(
      (res: any) => {
        this.loading = false;
        this.wallpapers = res.data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  private clearData(): void {
    this.board = {
      name: '',
      status: true,
      workspace_id: this.data.workspace_id,
      imageBackUrl: '',
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createBoard(ev: Event): void {
    ev.preventDefault();
    if (!this.board.name) {
      return this.snackSvc.opensnack('Ingrese el nombre del tablero');
    }
    this.loading = true;
    this.boardSvc.create(this.board).subscribe(
      (res: any) => {
        this.loading = false;
        this.boardCreated = res.data;
        this.onNoClick();
        this.boardSvc.list(this.data.workspace_id).subscribe(
          (res2: any) => {
            this.activiadad = ' creado tablero ' + this.board.name;
            const indexBoard = res2.data.length - 1;
            this.registerActivity = {
              idBoard: res2.data[indexBoard]._id,
              description: this.activiadad,
            };
            this.activityService
              .registerActivity(this.registerActivity)
              .subscribe(
                (res3) => {
                  console.log('se guardo actividad');
                },
                (err) => {
                  console.log('no se guardo actividad');
                  console.log(err.error);
                }
              );
          },
          (err) => {
            console.log('no se encontro el tablero en el espacio de trabajo');
            console.log(err);
          }
        );
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    );
  }
}
