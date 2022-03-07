import {AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {StatUser} from "../../../models/StatUser";
import {delay, startWith} from "rxjs";
import {CampingServiceService} from "../../services/camping-service.service";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {
  total: number = 0;
  option: any = {};
  isLoading = false;
  data:any
  constructor(private accountService: AccountService,
              public Load:LoaderService) {
  }





  statistic: StatUser = new StatUser();

  ngOnInit(): void {
    this.getStatistic();

  }
  getStatistic() {
    this.accountService.getStatUser().subscribe(data => {
        this.statistic = data;
        this.total = this.statistic.male + this.statistic.female;
      }
    )
  }


}
