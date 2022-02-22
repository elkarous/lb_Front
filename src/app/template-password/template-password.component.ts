import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../Authentification/services/token.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-template-password',
  templateUrl: './template-password.component.html',
  styleUrls: ['./template-password.component.scss']
})
export class TemplatePasswordComponent implements OnInit {
  password = new FormControl(null, [Validators.required, Validators.minLength(8)])
  confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)])
  passwordForm: FormGroup = new FormGroup({
    password :this.password,
    confirmPassword:this.confirmPassword
  },);
  hide = true;
  show = true;
  constructor(private accountService:AccountService,
              private token:TokenService,
              private toast:ToastrService) { }

  ngOnInit(): void {
  }
  getErrorConfirmPasswordMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return this.confirmPassword.hasError('password') ? 'Not password valid' : '';
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not password valid' : '';
  }

  confirm() {

    this.accountService.resetPassword(this.token.getId(),this.password.value).subscribe(next =>
      this.toast.success("password reset"),
      error => this.toast.error(error.error.message())
    );
  }
}
