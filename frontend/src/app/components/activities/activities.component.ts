import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {
  
  displayedColumns: string[] = ['description'];
  dataSource:any;
  activityData: any;
  ELEMENT_DATA = [];
  constructor(
    private _activityService: ActivitiesService,
    private _router: Router,
    public dialogRef: MatDialogRef<ActivitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.activityData = {};
    
   }

  ngOnInit(): void {
    this._activityService.listActivities(this.data.board_id).subscribe(
      (res) => {
        this.activityData = res.activity;     
        this.dataSource = this.activityData;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
