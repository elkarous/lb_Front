import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {Camping} from "../../models/Camping";
import {CampingServiceService} from "../services/camping-service.service";
import {LoaderService} from "../services/loader.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AgmMap} from "@agm/core";


@Component({
  selector: 'app-proprieties',
  templateUrl: './proprieties.component.html',
  styleUrls: ['./proprieties.component.scss']
})
export class ProprietiesComponent implements OnInit,AfterViewInit {

iconMap = {
    iconUrl: 'assets/img/logo.svg',
    iconHeight: '5',
  iconWidth:'5'

  }


  numbers: number[];
  previous: any;
  value;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('AgmMap') agmMap: AgmMap;
  constructor(private campService: CampingServiceService,
              public LoadService: LoaderService,) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  zoom: number = 5;
  lat: number = 47.322047;
  lng: number = 5.04148;

  camping: Camping[];
  base64Data: Int8Array;
  retrievedImage: string;
  displayedColumns: string[] = ['name'];
campingClicked: Camping[]=[];
  latitude: number;
  longitude: number;
  show=false;
  ngOnInit(): void {
    this.getAllCamping();
    this.dataSource = new MatTableDataSource(this.camping);
    this.dataSource.paginator = this.paginator;
  }

  clickedMarker( star: number) {
    this.nbStars(star);
  }

  getImage(camp: Camping) {
    this.base64Data = camp.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    return this.retrievedImage;
  }

  getAllCamping() {
    this.campService.getAllCamping().subscribe(data => {
      this.camping = data
      this.dataSource.data = data
    })
  }

  nbStars(stars: number) {
    this.numbers = Array(stars).fill(4);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onClickCamp(camp:Camping){
this.lat=camp.latitude
this.lng=camp.longitude
    this.zoom=12
    this.camping=null
this.ngAfterViewInit();

  }
}

