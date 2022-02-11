import {Role} from "./Role";
import {DatePipe} from "@angular/common";
import {FileDB} from "./FileDB";

export class UserEntity{
  id:number;
 firstName:string;
 lastName:string;
 email:string;
 password:string;
  creation_date:Date;
 role :Role;
 image :FileDB;
 phone:number;
 gender:string
}
