import { Component, OnInit ,Input} from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
   @Input() idBoard: string;
  activityData: any;
  constructor(
    private _activityService: ActivitiesService,
    private _router: Router,
  ) {
    this.activityData = {};
    
   }

  ngOnInit(): void {
    console.log("este es el id " + this.idBoard);
    
    this._activityService.listActivities(this.idBoard).subscribe(
      (res) => {
        this.activityData = res.activity;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

}
