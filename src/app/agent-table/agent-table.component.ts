import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../services/account.service";
import {UserEntity} from "../../models/userEntity";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../Authentification/services/token.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateUserComponent} from "../user/update-user/update-user.component";
import {LoaderService} from "../services/loader.service";

@Component({
  selector: 'app-agent-table',
  templateUrl: './agent-table.component.html',
  styleUrls: ['./agent-table.component.scss']
})
export class AgentTableComponent implements OnInit {
@Input() region:string
  agent:UserEntity[];
  displayedColumns: string[] = ['id','firstName','lastName','camping','email','creation_date','phone','gender','actions'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: UserEntity[];
  images:string[];
  base64Data: Int8Array;
  retrievedImage: string;
 confirm: boolean;

  constructor( private accountService:AccountService ,
               private toast:ToastrService,
               private token:TokenService,
               private dialog: MatDialog,
               public LoadService: LoaderService) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  blockUser(user:UserEntity){
    if(user.isBlocked) {
      this.confirm = window.confirm('do you went to block this user')
    }else this.confirm= window.confirm('do you went to unblock this user')
    if(confirm) {
      user.isBlocked=!user.isBlocked;
      this.accountService.updateUserWithoutImage(user).subscribe(res => {
          if(user.isBlocked) {
            this.toast.success("user blocked ", 'delete', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            })
          }else  this.toast.success("user unblocked ", 'delete', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          })
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

  ngOnInit(): void {
  this.accountService.getAgentByRegion(this.region).subscribe(data=>this.dataSource.data=data);
  }

}
