import {Region} from "./Region";
import {FileDB} from "./FileDB";

export class Camping {
  id;

  name: string;

  campDescription: string;

  longitude: number;
  latitude: number;
  nbStars:number;
  address: string;

  country: string;

  creationDate: Date;

  editionDate: Date;

  status: Date;

  openingDate: Date;

  closingDate: Date;
  region: Region;
  image: FileDB;
}
