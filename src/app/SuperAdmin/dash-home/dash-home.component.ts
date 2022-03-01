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
export class DashHomeComponent implements OnInit,AfterViewInit {
  total: number = 0;
  option: any = {};
  isLoading = false;
data:any
  constructor(private accountService: AccountService,
              private  campingService:CampingServiceService,
              public Load:LoaderService) {
  }

  ngAfterViewInit(): void {
        this.getData();
    }

  onChartInit(e: any) {
    this.option = {
      color: [
        '#5cb85c',
        '#65C6BB',
        '#1BBC9B',
        '#f0ad4e',
        '#d9534f',
        '#5cb85c',
        '#f0ad4e',
        'red',  'yellow','#4D775EFF','green', 'purple', 'teal'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        top: 'bottom'
      },
      series: [
        {
          name: 'Nationality',
          type: 'pie',
          radius: '60%',
          data: this.data,
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
getData(){
    this.campingService.getNationality('512').subscribe(data=>this.data=data)
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
    width: 700,
    height: 350
  };

  datas = [
    {
      "name": "AT",
      "value": 13.0
    },
    {
      "name": "BE",
      "value": 7181.0
    },
    {
      "name": "BG",
      "value": 8.0
    },
    {
      "name": "CA",
      "value": 11.0
    },
    {
      "name": "CH",
      "value": 247.0
    },
    {
      "name": "CZ",
      "value": 14.0
    },
    {
      "name": "DE",
      "value": 1187.0
    },
    {
      "name": "DK",
      "value": 218.0
    },
    {
      "name": "ES",
      "value": 22.0
    },
    {
      "name": "FR",
      "value": 28231.0
    },
    {
      "name": "GB",
      "value": 1256.0
    },
    {
      "name": "HU",
      "value": 36.0
    },
    {
      "name": "IE",
      "value": 90.0
    },
    {
      "name": "IT",
      "value": 43.0
    },
    {
      "name": "LU",
      "value": 49.0
    },
    {
      "name": "MA",
      "value": 3.0
    },
    {
      "name": "NL",
      "value": 3610.0
    },
    {
      "name": "PL",
      "value": 7.0
    },
    {
      "name": "SE",
      "value": 26.0
    },
    {
      "name": "SN",
      "value": 13.0
    },
    {
      "name": "TH",
      "value": 8.0
    }
  ]
}
