import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardI } from 'src/app/interfaces/board';
import { WorkspaceI } from 'src/app/interfaces/workspace';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WorkspacesService } from 'src/app/services/workspaces.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  loading = false;
  workspace: WorkspaceI = {
    name: '',
    description: '',
    _id: '',
    user_id: [],
  };
  email: '';
  users: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddUsersComponent>,
    private snackSvc: SnackbarService,
    private workspaceSvc: WorkspacesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getWorkspace();
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getWorkspace(): void {
    this.loading = true;

    const workspace_id = typeof this.data === 'string' ? this.data : this.data.workspace_id;
    
    this.workspaceSvc.get(workspace_id).subscribe(
      (res: any) => {
        this.loading = false;
        this.workspace = res.data;
        this.getUsers();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  addUser(ev: Event): void {
    ev.preventDefault();
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = re.test(String(this.email).toLowerCase());

    if( !isValidEmail ) return this.snackSvc.opensnack('Ingrese un correo electrónico valido');

    this.loading = true;

    const payload = {
      workspace_id: this.workspace._id,
      email: this.email,
    };

    this.workspaceSvc.addUser(payload).subscribe(
      (res: HttpResponse<any>) => {
        this.loading = false;
        this.email = '';
        this.getUsers();
        
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  getUsers(): void {
    this.loading = true;
    this.workspaceSvc.listUsers(this.workspace._id).subscribe(
      (res: any) => {
        this.loading = false;
        this.users = res.data;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

  removeUser(email: string): void {
    this.loading = true;

    const payload = {
      workspace_id: this.workspace._id,
      email,
    }

    this.workspaceSvc.removeUser(payload).subscribe(
      (res: any) => {
        this.loading = false;
        this.getUsers();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.snackSvc.opensnack(err.error);
      }
    )
  }

}
