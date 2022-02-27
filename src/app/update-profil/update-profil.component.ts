import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {TokenService} from "../Authentification/services/token.service";
import {UserEntity} from "../../models/userEntity";
import {ToastrService} from "ngx-toastr";
import {FileDB} from "../../models/FileDB";

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.scss']
})
export class UpdateProfilComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  user:UserEntity=new UserEntity();
  hide = true;
  message: any;
  photo: File;
  password=new FormControl(null, [Validators.required, Validators.minLength(8)])
   base64Data: Int8Array;
 retrievedImage: string;

  constructor(private accountService:AccountService,
              private tokenService:TokenService,
              private toast:ToastrService) { }

  ngOnInit(): void {
    this.getUserById();
    this.user.image=new FileDB();
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not password valid' : '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
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
      console.log(this.photo)
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
        this.user.image = this.message;
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
