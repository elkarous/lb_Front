import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserEntity} from "../../../models/userEntity";
import {AccountService} from "../../services/account.service";
import {TokenService} from "../../Authentification/services/token.service";
import {ToastrService} from "ngx-toastr";
import {FileDB} from "../../../models/FileDB";
import {Region} from "../../../models/Region";
import {Camping} from "../../../models/Camping";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  regions: Region[]
  email = new FormControl('', [Validators.required, Validators.email]);
  user: UserEntity = new UserEntity();
  hide = true;
  Admin = true;
  confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)])
  show = true;
  message: File;
  photo: File;
  password = new FormControl(null, [Validators.required, Validators.minLength(8)])
  base64Data: Int8Array;
  retrievedImage: string = 'assets/img/avatar.jpg';
  region: Region;
  campings: Camping[];
  camp: Camping;

  constructor(private accountService: AccountService,
              private tokenService: TokenService,
              private toast: ToastrService,
              private route: Router
  ) {
  }

  ngOnInit(): void {
    this.user.image = new FileDB();
    this.user.address = new Region();
    this.user.camping = new Camping();
    this.getAllAddress();

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

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
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

  addUser() {
    this.user.password = this.password.value;
    this.user.address = this.region;
    this.user.camping = this.camp;
    if (this.photo != null) {
      const formData = new FormData();
      if (this.photo) {
        this.user.image.name = this.photo.name;
      }
      console.log(this.user)
      formData.append('image', this.photo);
      formData.append('userDto', JSON.stringify(this.user));
      this.accountService.addUser(formData)
        .subscribe(res => {
            this.toast.success('Data added successfully !!', 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.route.navigateByUrl("/dashboard")
          },
          error => this.toast.error('Data not added !!', 'add', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          }));
    } else {
      this.accountService.addUserWithoutImage(this.user)
        .subscribe(res => {
            this.toast.success('Data added successfully !!', 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.route.navigateByUrl("/dashboard")
          },
          error => {
            this.toast.error(error.error.message, 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            })
            console.log(error)
          });

    }

  }

  getAllAddress() {
    this.accountService.getAllAddress().subscribe(data => this.regions = data)
  }

  getAddressByRegion() {
    this.accountService.getAddressByRegion(this.region.region).subscribe(data => this.campings = data)
  }
}