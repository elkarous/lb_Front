import {AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {StatUser} from "../../../models/StatUser";
import {delay, startWith} from "rxjs";

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {
  total: number = 0;
  option: any = {};
  isLoading = true;
  constructor(private accountService: AccountService) {
  }
  onChartInit(e: any) {
   this.option={
     color:['#70a888','#7090a8'],
     tooltip: {
       trigger: 'item'
     },
     legend: {
       orient: 'horizontal',
       top: 'top'
     },
     series: [
       {
         name: 'Gender',
         type: 'pie',
         radius: '60%',
         data: [
           {value: this.statistic.male, name: 'Male'},
           {value: this.statistic.female, name: 'Female'},
         ],
         emphasis: {
           itemStyle: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       }
     ]
   };
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

  initOpts = {
    renderer: 'svg',
    width: 400,
    height: 350
  };


}
