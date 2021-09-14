import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserI;
  loading = false;

  constructor(
    private snackSvc: SnackbarService,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.clearData();
  }

  ngOnInit(): void {
  }

  private clearData() {
    this.user = {
      email: '',
      password: '',
    }
  }

  register(ev: Event): void {
    ev.preventDefault();
    
    if( !this.user.name || !this.user.email || !this.user.password ) return this.snackSvc.opensnack('Complete todos los datos');

    this.loading = true;
    this.authSvc.register(this.user).subscribe(
      (res: any) => {
        this.loading = false;
        this.snackSvc.opensnack('Registro correcto');
        this.clearData();
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.loading = false;
        this.snackSvc.opensnack(`Registro incorrecto ${ err.error }`);
      }
    )
  }

}
