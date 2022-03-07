import {AfterViewInit, Component,  ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserEntity} from "../../../models/userEntity";
import {AccountService} from "../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListUserComponent implements AfterViewInit  {

  displayedColumns: string[] = ['image','firstName','lastName','email','role','region','creation_date','phone','gender','isBlocked','expand'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 users: UserEntity[];
 images:string[];
  base64Data: Int8Array;
  retrievedImage: string;
 expandedElement: UserEntity;
  confirm:boolean;
  constructor( private accountService:AccountService ,
               private toast:ToastrService,
               private dialog: MatDialog,
               private _snackBar: MatSnackBar
               ) {
             this.dataSource = new MatTableDataSource(this.users);

  }

  ngAfterViewInit() {
    this.getAllUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.expandedElement = new UserEntity();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action , {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }
  getAllUser(){
this.accountService.getAllUserWithoutAgent().subscribe(data=> {
    this.dataSource.data=data;

  }
)
  }
blockUser(user:UserEntity){
    if(user.isBlocked) {
      this.confirm = window.confirm('do you went to block this user')
    }else this.confirm= window.confirm('do you went to unblock this user')
  if(confirm) {
    user.isBlocked=!user.isBlocked;
    this.accountService.updateUserWithoutImage(user).subscribe(res => {
      if(user.isBlocked) {
        this.openSnackBar("User Blocked",'x')

      }else  this.openSnackBar("User Unblocked" ,'x')
        this.ngAfterViewInit();
      },
      error => this.toast.error('something wrong '))
  }}
  onEdit(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data=row;
    this.dialog.open(UpdateUserComponent,dialogConfig);
    this.dialog.afterAllClosed.subscribe(()=>this.ngAfterViewInit());
  }
  getImage(user:UserEntity) {
    this.base64Data = user.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    return this.retrievedImage;
  }

}
