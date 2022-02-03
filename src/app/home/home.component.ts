import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {AccountService} from "../services/account.service";
import {TokenService} from "../services/token.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserEntity} from "../../models/userEntity";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PasswordComponent} from "../password/password.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
user : UserEntity | undefined ;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password=new FormControl(null, [Validators.required, Validators.minLength(8)])
  loginForm = new FormGroup({
    email: this.email,
    password:this.password

  });
  constructor(  private authService: AuthentificationService,
                private token: TokenService,
                private account: AccountService,
                private toastr: ToastrService,
                private router:Router,
                private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(PasswordComponent,{
      height: '40%',
      width: '40%'
    });
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not password valid' : '';
  }

  signIn() {
    this.authService.login(this.loginForm.value).subscribe(
        res => this.handleResponse(res),
        err => this.toastr.error(
          `error`,
          'email or password incorrect !',
          {
            timeOut: 3000,
            positionClass: 'toast-bottom-left'
          }
        )); }
  handleResponse(data:any) {
    this.token.handle(data);


    this.account.changeAuthStatus(true);
    this.toastr.success(
      `Welcome `+this.token.getUserName(),
      'you are connected !',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',

      },

    );

    this.router.navigateByUrl('/dashboard');
  }


}
