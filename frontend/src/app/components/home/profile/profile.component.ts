import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  MyName: any;
  MySpaces:any;

  constructor(private _userService: UserService) {
    this.MyName = {};
    this.MySpaces = {};
  }

  ngOnInit(): void {
    this._userService.getMyInfo().subscribe(
      (res) => {
        console.log(res);
        this.MyName = res.MyName;
      },
      (err) => {
        console.log("NO HAY NADA F");
      }
    )

    this._userService.listSpaceWork().subscribe(
      (res) => {
        console.log("HAY ALGO??");
        this.MySpaces = res.data.length;
        console.log(this.MySpaces);


      },
      (err) => {
        console.log("NO HAY NADA F");
      }
    )

  }
}
