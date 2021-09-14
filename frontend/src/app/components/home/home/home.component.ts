import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkspaceI } from 'src/app/interfaces/workspace';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WorkspacesService } from 'src/app/services/workspaces.service';
import { CreateWorkspaceComponent } from '../../dialogs/create-workspace/create-workspace.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  workspaces: WorkspaceI[];

  constructor(
    public dialog: MatDialog,
    private workspaceSvc: WorkspacesService,
    private snackSvc: SnackbarService
  ) {
    this.getWorkspaces();
  }

  ngOnInit(): void {
  }

  openCrateWorkspaceDialog(): void {
    const dialogRef = this.dialog.open(CreateWorkspaceComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe( res => {
      this.getWorkspaces();
    })
  }

  getWorkspaces() {
    this.workspaceSvc.list().subscribe(
      (res: any) => {
        this.workspaces = res.data;
        
      },
      (err: HttpErrorResponse) => {
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
