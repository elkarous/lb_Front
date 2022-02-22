import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../Authentification/services/token.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";
import {AccountService} from "../../services/account.service";
import {UserEntity} from "../../../models/userEntity";
import {MatDialog} from "@angular/material/dialog";
import {ProfileComponent} from "../profile/profile.component";
import {TemplatePasswordComponent} from "../../template-password/template-password.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: UserEntity
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  constructor(private tokenService: TokenService,
              private router: Router,
              public LoadService: LoaderService,
              private accountService: AccountService,
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUserById();

  }


  logout() {
    this.tokenService.remove();
    this.router.navigateByUrl("/");

  }

  getUserById() {
    this.accountService.getUserByEmail(this.tokenService.getId()).subscribe(data => {
        this.user = data;
        this.getImage();
      }
    )
  }

  getImage() {
    this.base64Data = this.user.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }
  openDialog() {
    this.dialog.open(ProfileComponent,{
      height: '50%',
      width: '40%'
    });
  }
  openDialogPassword() {
    this.dialog.open(TemplatePasswordComponent,{
      height: '40%',
      width: '60%'
    });
  }
}
