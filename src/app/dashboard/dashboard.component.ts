import { Component, OnInit } from '@angular/core';
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";
import {LoaderService} from "../services/loader.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenService:TokenService,
              private router:Router,
              public  LoadService :LoaderService) { }

  ngOnInit(): void {
  }
  logout(){
    this.tokenService.remove();
    this.router.navigateByUrl("/");

  }

}
