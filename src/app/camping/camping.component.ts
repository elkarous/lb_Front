import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CampingServiceService} from "../services/camping-service.service";
import {Camping} from "../../models/Camping";
import {FileDB} from "../../models/FileDB";

@Component({
  selector: 'app-camping',
  templateUrl: './camping.component.html',
  styleUrls: ['./camping.component.scss']
})
export class CampingComponent implements OnInit, AfterViewInit {
  numbers: number[];
  data = null;
  id: string;
  option: any = {};

  constructor(private router: ActivatedRoute,
              private campingService: CampingServiceService) {
    this.id = this.router.snapshot.paramMap.get("id");
  }

  camping = new Camping();
  base64Data: Int8Array;
  retrievedImage: string;

  ngOnInit(): void {
    this.camping.image=new FileDB();
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
        'red', 'yellow', '#4D775EFF', 'green', 'purple', 'teal'],
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

  getCamping() {
    this.campingService.getCampingById(this.id).subscribe(data => this.camping = data);
  }

  clickedMarker(star: number) {
    this.nbStars(star);
  }

  nbStars(stars: number) {
    this.numbers = Array(this.camping.nbStars).fill(4);
  }

  getImage(camp: Camping) {
    this.base64Data = camp.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    return this.retrievedImage;
  }

  initOpts = {
    renderer: 'svg',
    width: 700,
    height: 350
  };

  ngAfterViewInit(): void {
    this.nbStars(this.camping.nbStars);
    this.getCamping();
  }

  getData() {
    this.campingService.getNationality(this.id).subscribe(data => this.data = data)
  }
}
