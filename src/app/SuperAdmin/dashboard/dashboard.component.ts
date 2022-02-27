import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../Authentification/services/token.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";
import {AccountService} from "../../services/account.service";
import {UserEntity} from "../../../models/userEntity";
import {TemplatePasswordComponent} from "../../template-password/template-password.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: UserEntity=new UserEntity();
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;



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
    this.router.navigateByUrl("/").then();

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

}
