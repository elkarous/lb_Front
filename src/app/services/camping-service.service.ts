import { Injectable } from '@angular/core';
import {TokenService} from "../Authentification/services/token.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Camping} from "../../models/Camping";
import {Nationality} from "../../models/nationality";
import {NationalityRequest} from "../../models/nationalityRequest";
import {CampingResponse} from "../../models/CampingResponse";

@Injectable({
  providedIn: 'root'
})
export class CampingServiceService {
  private url = 'http://localhost:8085/camping/';

  constructor( private http: HttpClient) {
  }
getAllCamping():Observable<Camping[]>{
    return this.http.get<Camping[]>(this.url);
}
getCampingById(id):Observable<Camping>{
    return this.http.get<Camping>(this.url+id)
}
getNationality(nationalityRequest:NationalityRequest ):Observable<Nationality[]>{
    return this.http.post<Nationality[]>('http://localhost:8085/pickup/count/',nationalityRequest)
}
getNames() :Observable<CampingResponse []>{
    return this.http.get<CampingResponse[]>(this.url+"names")
}
}
