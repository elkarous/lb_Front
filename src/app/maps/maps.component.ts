import {Component, Input, OnInit} from '@angular/core';
import {UserEntity} from "../../models/userEntity";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit{
   constructor(private accountService:AccountService) {
   }
  // google maps zoom level
  zoom: number = 4;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
users:UserEntity[]
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  ngOnInit(): void {
this.getAllUsers();
  }
  getAllUsers(){
  this.accountService.getAllUsers().subscribe(data=>{

    this.users=data
    console.log(this.users)
  });
  }



}
