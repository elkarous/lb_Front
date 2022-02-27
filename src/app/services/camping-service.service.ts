import { Injectable } from '@angular/core';
import {TokenService} from "../Authentification/services/token.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Camping} from "../../models/Camping";

@Injectable({
  providedIn: 'root'
})
export class CampingServiceService {
  private url = 'http://localhost:8085/camping';

  constructor( private http: HttpClient) {
  }
getAllCamping():Observable<Camping[]>{
    return this.http.get<Camping[]>(this.url);
}
}
