import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserEntity} from "../../../models/userEntity";
import {AccountService} from "../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateUserComponent} from "../../user/update-user/update-user.component";
import {TokenService} from "../../Authentification/services/token.service";

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss']
})
export class ListAgentComponent implements AfterViewInit {

  displayedColumns: string[] = ['id','camping','email','firstName','lastName','creation_date','phone','gender','actions'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: UserEntity[];
  images:string[];
  base64Data: Int8Array;
  retrievedImage: string;
  constructor( private accountService:AccountService ,
               private toast:ToastrService,
               private token:TokenService,
               private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit() {
    this.getAllUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllUser(){
    this.accountService.getAgentByRegion(this.token.getRegion()).subscribe(data=> {
        this.dataSource.data=data;

      }
    )
  }
  deleteUser(id:number){
    let confirm= window.confirm('do you went to delete this user')
    if(confirm) {
      this.accountService.deleteUser(id).subscribe(res => {
          this.toast.success("user deleted ",'delete', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'})
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
