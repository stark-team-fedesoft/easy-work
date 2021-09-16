import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserI;
  loading = false;

  constructor(
    private authSvc: AuthService,
    private snackSvc: SnackbarService,
    private router: Router
  ) {
    this.clearData();
    if( this.authSvc.isLoggedIn() ) this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

  private clearData() {
    this.user = {
      email: '',
      password: '',
    }
  }

  login(ev: Event): void {
    ev.preventDefault();
    
    if( !this.user.email || !this.user.password ) return this.snackSvc.opensnack('Complete todos los datos');

    this.loading = true;
    this.authSvc.login(this.user).subscribe(
      (res: any) => {
        this.loading = false;
        this.snackSvc.opensnack('Bienvenido');
        this.clearData();
        this.authSvc.setToken(res.jwtToken);
        this.router.navigate(['/home']);
      },
      (err: any) => {
        this.loading = false;
        this.snackSvc.opensnack(`${ err.error }`);
      }
    )
  }

}
