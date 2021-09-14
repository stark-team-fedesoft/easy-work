import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss']
})
export class CreateWorkspaceComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateWorkspaceComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
