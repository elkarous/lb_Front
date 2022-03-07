import {Component, OnInit} from '@angular/core';
import {CampingServiceService} from "../services/camping-service.service";
import {CampingResponse} from "../../models/CampingResponse";
import {PickupService} from "../services/pickup.service";
import {CampStatResponse} from "../../models/CampStatResponse";

@Component({
  selector: 'app-camp-stat',
  templateUrl: './camp-stat.component.html',
  styleUrls: ['./camp-stat.component.scss']
})
export class CampStatComponent implements OnInit {
  value: any;
  axes: string[] = ['Camping', 'Accommodation', 'Occupancy date', 'Season', 'Day of week', 'Month', 'Year'];
  options: any;
  camping: CampingResponse[];
  hebergement: number[];
  selectedCamp: CampingResponse;
  data: CampStatResponse[] =[
    {
      "camping": 5,
      "stat": 1,
      "reservation": 34274096
    },
    {
      "camping": 5,
      "stat": 2,
      "reservation": 1597540
    },
    {
      "camping": 13,
      "stat": 1,
      "reservation": 32541698
    },
    {
      "camping": 13,
      "stat": 2,
      "reservation": 2367908
    },
    {
      "camping": 16,
      "stat": 1,
      "reservation": 31750128
    },
    {
      "camping": 16,
      "stat": 2,
      "reservation": 1422276
    },
    {
      "camping": 29,
      "stat": 1,
      "reservation": 31341641
    },
    {
      "camping": 29,
      "stat": 2,
      "reservation": 1984425
    },
    {
      "camping": 31,
      "stat": 1,
      "reservation": 21704128
    },
    {
      "camping": 31,
      "stat": 2,
      "reservation": 1507870
    },
    {
      "camping": 57,
      "stat": 1,
      "reservation": 29503076
    },
    {
      "camping": 57,
      "stat": 2,
      "reservation": 986388
    },
    {
      "camping": 59,
      "stat": 1,
      "reservation": 965142
    },
    {
      "camping": 59,
      "stat": 2,
      "reservation": 117995
    },
    {
      "camping": 85,
      "stat": 1,
      "reservation": 10064010
    },
    {
      "camping": 85,
      "stat": 2,
      "reservation": 915438
    },
    {
      "camping": 197,
      "stat": 1,
      "reservation": 19485745
    },
    {
      "camping": 197,
      "stat": 2,
      "reservation": 1384988
    },
    {
      "camping": 493,
      "stat": 1,
      "reservation": 8736853
    },
    {
      "camping": 493,
      "stat": 2,
      "reservation": 105615
    },
    {
      "camping": 512,
      "stat": 1,
      "reservation": 22334811
    },
    {
      "camping": 512,
      "stat": 2,
      "reservation": 1431827
    },
    {
      "camping": 594,
      "stat": 1,
      "reservation": 14215733
    },
    {
      "camping": 594,
      "stat": 2,
      "reservation": 984740
    },
    {
      "camping": 794,
      "stat": 1,
      "reservation": 9851506
    },
    {
      "camping": 794,
      "stat": 2,
      "reservation": 1017751
    },
    {
      "camping": 1094,
      "stat": 1,
      "reservation": 32581077
    },
    {
      "camping": 1094,
      "stat": 2,
      "reservation": 2522599
    },
    {
      "camping": 1157,
      "stat": 1,
      "reservation": 5540443
    },
    {
      "camping": 1157,
      "stat": 2,
      "reservation": 631755
    },
    {
      "camping": 1179,
      "stat": 1,
      "reservation": 14568176
    },
    {
      "camping": 1179,
      "stat": 2,
      "reservation": 1126410
    },
    {
      "camping": 1393,
      "stat": 1,
      "reservation": 11252963
    },
    {
      "camping": 1393,
      "stat": 2,
      "reservation": 823564
    },
    {
      "camping": 1597,
      "stat": 1,
      "reservation": 16234127
    },
    {
      "camping": 1597,
      "stat": 2,
      "reservation": 1068132
    },
    {
      "camping": 2842,
      "stat": 1,
      "reservation": 27415359
    },
    {
      "camping": 2842,
      "stat": 2,
      "reservation": 2101520
    },
    {
      "camping": 3899,
      "stat": 1,
      "reservation": 16023112
    },
    {
      "camping": 3899,
      "stat": 2,
      "reservation": 2098435
    },
    {
      "camping": 3999,
      "stat": 1,
      "reservation": 35467604
    },
    {
      "camping": 3999,
      "stat": 2,
      "reservation": 2752964
    },
    {
      "camping": 4029,
      "stat": 1,
      "reservation": 15798357
    },
    {
      "camping": 4029,
      "stat": 2,
      "reservation": 674391
    },
    {
      "camping": 4567,
      "stat": 1,
      "reservation": 10451519
    },
    {
      "camping": 4567,
      "stat": 2,
      "reservation": 618769
    },
    {
      "camping": 4840,
      "stat": 1,
      "reservation": 2467395
    },
    {
      "camping": 4840,
      "stat": 2,
      "reservation": 41648
    },
    {
      "camping": 5047,
      "stat": 1,
      "reservation": 48456710
    },
    {
      "camping": 5047,
      "stat": 2,
      "reservation": 3172135
    },
    {
      "camping": 5186,
      "stat": 1,
      "reservation": 28563749
    },
    {
      "camping": 5186,
      "stat": 2,
      "reservation": 2042332
    },
    {
      "camping": 5279,
      "stat": 1,
      "reservation": 29799839
    },
    {
      "camping": 5279,
      "stat": 2,
      "reservation": 2311146
    },
    {
      "camping": 6966,
      "stat": 1,
      "reservation": 14570235
    },
    {
      "camping": 6966,
      "stat": 2,
      "reservation": 1462000
    },
    {
      "camping": 6996,
      "stat": 1,
      "reservation": 9092613
    },
    {
      "camping": 6996,
      "stat": 2,
      "reservation": 769508
    },
    {
      "camping": 7033,
      "stat": 1,
      "reservation": 70203
    },
    {
      "camping": 7033,
      "stat": 2,
      "reservation": 9814
    },
    {
      "camping": 7034,
      "stat": 1,
      "reservation": 174105
    },
    {
      "camping": 7034,
      "stat": 2,
      "reservation": 29937
    },
    {
      "camping": 7201,
      "stat": 1,
      "reservation": 22025
    },
    {
      "camping": 7201,
      "stat": 2,
      "reservation": 2051
    },
    {
      "camping": 7204,
      "stat": 1,
      "reservation": 69700
    },
    {
      "camping": 7204,
      "stat": 2,
      "reservation": 4449
    },
    {
      "camping": 7205,
      "stat": 1,
      "reservation": 33323
    },
    {
      "camping": 7205,
      "stat": 2,
      "reservation": 1012
    },
    {
      "camping": 7206,
      "stat": 1,
      "reservation": 117377
    },
    {
      "camping": 7206,
      "stat": 2,
      "reservation": 19744
    },
    {
      "camping": 7207,
      "stat": 1,
      "reservation": 18945
    },
    {
      "camping": 7207,
      "stat": 2,
      "reservation": 3063
    },
    {
      "camping": 7208,
      "stat": 1,
      "reservation": 32509
    },
    {
      "camping": 7208,
      "stat": 2,
      "reservation": 8604
    },
    {
      "camping": 7224,
      "stat": 1,
      "reservation": 5591993
    },
    {
      "camping": 7224,
      "stat": 2,
      "reservation": 509213
    },
    {
      "camping": 7612,
      "stat": 1,
      "reservation": 213901
    },
    {
      "camping": 7612,
      "stat": 2,
      "reservation": 15425
    },
    {
      "camping": 7625,
      "stat": 1,
      "reservation": 4331039
    },
    {
      "camping": 7625,
      "stat": 2,
      "reservation": 9922
    },
    {
      "camping": 7646,
      "stat": 1,
      "reservation": 6589557
    },
    {
      "camping": 7646,
      "stat": 2,
      "reservation": 12063
    },
    {
      "camping": 7647,
      "stat": 1,
      "reservation": 1106289
    },
    {
      "camping": 7647,
      "stat": 2,
      "reservation": 4584
    },
    {
      "camping": 7661,
      "stat": 1,
      "reservation": 20372903
    },
    {
      "camping": 7661,
      "stat": 2,
      "reservation": 91
    }
  ];
  heber: string;
  season: string;
  day: string;
  month: string;
  year: string;

  constructor(private campingService: CampingServiceService,
              private pickupService: PickupService) {
    this.getCamping();
  }
setData(){
  const data1 =[]
  const data2 = []
  const data3 = []
  const xAxisData = [];
  for (let i = 0; i < this.data.length; i+=2) {
    xAxisData.push('camping' + this.data[i].camping);
    data1.push(this.data[i].reservation);
    data2.push(this.data[i+1].reservation);
    data3.push(this.data[i].reservation-this.data[i+1].reservation)
  }

  this.options = {
    legend: {
      data: ['Reservation', 'Annulation','Nette reservation'],
      align: 'left',
    },
    tooltip: {},
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar','pie']},
        restore: {show: true},
        saveAsImage: {show: true}
      }},
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 10
      },
      {
        type: 'inside',
        start: 0,
        end: 10
      }
    ],
    xAxis: {
      data: xAxisData,
      silent: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        name: 'Reservation',
        type: 'bar',
        data: data1,
        animationDelay: (idx) => idx * 10,
      },
      {
        name: 'Annulation',
        type: 'bar',
        data: data2,
        animationDelay: (idx) => idx * 10 + 100,
      },
      {
        name: 'Nette reservation',
        type: 'bar',
        data: data3,
        animationDelay: (idx) => idx * 10,
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 5,
  };
}
  ngOnInit(): void {
   this.setData();

  }

  getAllCampStat() {
    this.pickupService.getAllCampStat().subscribe(data => {
        this.data = data;
        this.ngOnInit();
      }
    )
  }

  initOpts = {
    renderer: 'svg',
    width: 900,
    height: 500
  };

  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
  }

  getHebergementByCamping(id) {
    this.pickupService.getHebergementByCamping(id).subscribe(data => this.hebergement = data);
  }

  getCamping() {
    this.campingService.getNames().subscribe(data => this.camping = data);
    console.log(this.camping)
  }

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  years = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  axe: string;
  date: Date;
}
