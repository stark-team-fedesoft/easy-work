import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardI } from 'src/app/interfaces/board';
import { WorkspaceI } from 'src/app/interfaces/workspace';
import { BoardService } from 'src/app/services/board.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WorkspacesService } from 'src/app/services/workspaces.service';
import { CreateBoardComponent } from '../../dialogs/create-board/create-board.component';
import { CreateWorkspaceComponent } from '../../dialogs/create-workspace/create-workspace.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  workspaces: WorkspaceI[];
  workspace: WorkspaceI;
  boards: BoardI[] = [];
  loading = false;

  constructor(
    public dialog: MatDialog,
    private workspaceSvc: WorkspacesService,
    private boardSvc: BoardService,
    private snackSvc: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.getWorkspaces();
    
    

    this.route.params.subscribe( (val) => {
      setTimeout(() => {
        if(val.workspace_id) this.getBoards(val.workspace_id);      

      }, 500);
    });
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

  openCrateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      width: '30%',
      data: { workspace_id: this.workspace._id, workspace_name: this.workspace.name },
    });

    dialogRef.afterClosed().subscribe( res => {
      this.router.navigate(['/boards', dialogRef.componentInstance.boardCreated._id]);
    });
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

  getBoards( workspace_id: string ) {
    const workspace = this.workspaces.find( work => work._id === workspace_id);

    this.workspace = workspace;
    this.loading = true;

    this.boardSvc.list(workspace_id).subscribe(
      (res: any) => {
        this.loading = false;
        this.boards = res.data;
        
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
