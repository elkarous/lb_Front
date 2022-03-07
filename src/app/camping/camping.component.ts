import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CampingServiceService} from "../services/camping-service.service";
import {Camping} from "../../models/Camping";
import {FileDB} from "../../models/FileDB";
import {NationalityRequest} from "../../models/nationalityRequest";
import {Nationality} from "../../models/nationality";


@Component({
  selector: 'app-camping',
  templateUrl: './camping.component.html',
  styleUrls: ['./camping.component.scss']
})
export class CampingComponent implements OnInit, AfterViewInit {
  numbers: number[];
  data : Nationality[];
  id: string;
  option: any = {};

  constructor(private router: ActivatedRoute,
              private campingService: CampingServiceService) {
    this.id = this.router.snapshot.paramMap.get("id");
    this.getData(this.nationalityRequest);

  }

  seasonSelected=  {
    "startDate": "2020-11-01",
    "endDate": "2021-11-01",
    "seasonName": " Season 2021",
  };
  camping = new Camping();
  base64Data: Int8Array;
  retrievedImage: string
  nationalityRequest: NationalityRequest = {
    "camping": "512",
    "startDate": "2020-10-11",
    "endDate": "2021-10-11"
  };

  ngOnInit(): void {
    this.camping.image = new FileDB();

  }


  getCamping() {
    this.campingService.getCampingById(this.id).subscribe(data =>{ this.camping = data
    this.nbStars(data.nbStars);
    });
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
    width: 500,
    height: 480
  };

  ngAfterViewInit(): void {
    this.getCamping();

  }

  getData(nationalityRequest: NationalityRequest) {
    nationalityRequest.camping = this.id;
    this.campingService.getNationality(nationalityRequest).subscribe(data => {
        this.data = data;
        this.option = {
          title: {
            text: 'The distribution of clients nationalities ',
            x: 'center',
            textStyle:{
            fontFamily:"Helvetica Neue",
              fontWeight:"80"
            }
          },
          color: [
            '#de8809',
            '#55A9A2',
            '#555CA9',
            '#4D56B1',
            '#f0ad4e',
            '#d9534f',
            '#A95586',
            '#B14D56',
            '#4D56B1',
            '#0F1123',
            '#824D06'
            ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            position: ['5', '5']
          },
          legend: {
            orient: 'horizontal',
            top: 'bottom'
          },
          series: [
            {
              name: 'Nationality',
              type: 'pie',
              radius: '50%',
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

        }


      }
    )

  }

  seasons: Season[] = [
    {
      "startDate": "2021-11-01",
      "endDate": "2022-11-01",
      "seasonName": " Season 2022",
    },
    {
      "startDate": "2020-11-01",
      "endDate": "2021-11-01",
      "seasonName": " Season 2021",
    },
    {
      "startDate": "2019-11-01",
      "endDate": "2020-11-01",
      "seasonName": " Season 2020",
    },
    {
      "startDate": "2018-11-01",
      "endDate": "2019-11-01",
      "seasonName": " Season 2019",
    },
    {
      "startDate": "2017-11-01",
      "endDate": "2018-11-01",
      "seasonName": " Season 2018",
    },
    {
      "startDate": "2016-11-01",
      "endDate": "2017-11-01",
      "seasonName": " Season 2017",
    },
    {
      "startDate": "2016-11-01",
      "endDate": "2015-11-01",
      "seasonName": " Season 2016",
    }]

  getDateOnselect(season: Season) {
    this.nationalityRequest.camping = this.id;
    this.nationalityRequest.startDate = season.startDate;
    this.nationalityRequest.endDate = season.endDate;
    this.getData(this.nationalityRequest);
  }

}

interface Season {
  startDate: string;
  endDate: string;
  seasonName: string;
}
