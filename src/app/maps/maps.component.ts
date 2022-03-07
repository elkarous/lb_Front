import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {StatUser} from "../../models/StatUser";
import {CampingServiceService} from "../services/camping-service.service";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit{

  data:any=null;
   constructor(private campingService:CampingServiceService) {
   }

  ngAfterViewInit(): void {

    }
  initOpts = {
    renderer: 'svg',
    width: 700,
    height: 350
  };

   option = {
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
