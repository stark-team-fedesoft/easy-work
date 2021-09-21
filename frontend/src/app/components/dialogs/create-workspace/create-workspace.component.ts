import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkspaceI } from 'src/app/interfaces/workspace';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WorkspacesService } from 'src/app/services/workspaces.service';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss'],
})
export class CreateWorkspaceComponent {
  workspace: WorkspaceI;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateWorkspaceComponent>,
    private snackSvc: SnackbarService,
    private workspaceSvc: WorkspacesService
  ) {
    this.clearData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearData(): void {
    this.workspace = {
      name: '',
      description: '',
    };
  }

  createWorkspace(ev: Event): void {
    ev.preventDefault();

    if (!this.workspace.name) {
      return this.snackSvc.opensnack(
        'Ingrese el nombre del Espacio de trabajo'
      );
    }

    this.loading = true;
    this.workspaceSvc.create(this.workspace).subscribe(
      (res: any) => {
        this.loading = false;
        this.onNoClick();
        this.clearData();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    );
  }
}
