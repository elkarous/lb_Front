import { Component, OnInit } from '@angular/core';
import {UserEntity} from "../../../models/userEntity";
import {TokenService} from "../../Authentification/services/token.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";
import {AccountService} from "../../services/account.service";
import {MatDialog} from "@angular/material/dialog";
import {TemplatePasswordComponent} from "../../template-password/template-password.component";
import {ProfileComponent} from "../../Agent/profile/profile.component";

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export class DashAdminComponent  {

  user: UserEntity
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300
  };

  option = {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: 'Direct Visit'
          },
          {
            value: 234,
            name: 'Union Ad'
          },
          {
            value: 1548,
            name: 'Search Engine'
          }
        ]
      }
    ]
  };

  constructor(private tokenService: TokenService,
              private router: Router,
              public LoadService: LoaderService,
              private accountService: AccountService,
              private dialog:MatDialog
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
  openDialogPassword() {
    this.dialog.open(TemplatePasswordComponent,{
      height: '40%',
      width: '60%'
    });
  }
  openDialog() {
    this.dialog.open(ProfileComponent,{
      height: '50%',
      width: '40%'
    });
  }
}
