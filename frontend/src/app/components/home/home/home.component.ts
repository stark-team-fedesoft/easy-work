import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWorkspaceComponent } from '../../dialogs/create-workspace/create-workspace.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCrateWorkspaceDialog(): void {
    const dialogRef = this.dialog.open(CreateWorkspaceComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe( res => {
      console.log('cerrado');
      console.log(res);
      
    });
  }

}
