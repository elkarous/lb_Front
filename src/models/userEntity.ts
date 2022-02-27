import {Role} from "./Role";
import {FileDB} from "./FileDB";
import {Region} from "./Region";
import {Camping} from "./Camping";

export class UserEntity{
  id:string;
 firstName:string;
 lastName:string;
 email:string;
 password:string;
 creationDate:Date;
 role :Role;
 image :FileDB;
 phone:number;
 gender:string;
 region:Region;
 camping:Camping;
  isBlocked:boolean;
}
