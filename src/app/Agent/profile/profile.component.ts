import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {TokenService} from "../../Authentification/services/token.service";
import {ToastrService} from "ngx-toastr";
import {UserEntity} from "../../../models/userEntity";
import {FileDB} from "../../../models/FileDB";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  base64Data: Int8Array;
  retrievedImage: string;
  user:UserEntity;
  message: File;
  photo: File;
  constructor( private accountService:AccountService,
               private tokenService:TokenService,
               private toast:ToastrService) { }

  ngOnInit(): void {
    this.getUserById();
    this.user.image=new FileDB();
  }
  getUserById(){
    this.accountService.getUserByEmail(this.tokenService.getId()).subscribe(data=>{
      this.user=data;
      this.getImage();
    })
  }
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      this.message = this.photo;
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedImage = reader.result as string;
      }
      reader.readAsDataURL(this.photo)

    }
  }
  updateUser() {
    if(this.photo!=null) {
      const formData = new FormData();
      if (this.photo) {
        this.user.image.name = this.photo.name;
      }
      formData.append('image', this.photo);
      formData.append('userDto', JSON.stringify(this.user));
      this.accountService.updateUser(formData)
        .subscribe(()=> {
          this.toast.success('Data update successfully !!', 'UPDATE', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
        });
    }
    else {
      this.accountService.updateUserWithoutImage(this.user).subscribe(() => {
          this.toast.success('Data update successfully ', 'UPDATE', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
        }

      )

    }

  }
  getImage() {
    this.base64Data = this.user.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }

}
