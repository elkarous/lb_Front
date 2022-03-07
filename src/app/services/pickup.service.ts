import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CampStatComponent} from "../camp-stat/camp-stat.component";
import {CampStatResponse} from "../../models/CampStatResponse";

@Injectable({
  providedIn: 'root'
})
export class PickupService {
  url="http://localhost:8085/pickup/"
  constructor( private http: HttpClient) {
  }
  getHebergementByCamping(id:number) :Observable<number[]>{
    return  this.http.get<number[]>(this.url+id)
  }
  getAllCampStat():Observable<CampStatResponse[]>{
    return this.http.get <CampStatResponse[]>(this.url+'stat')
  }
}
