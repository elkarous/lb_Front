import {Region} from "./Region";

export class Camping {
  id;

  name: string;

  campDescription: string;

  longitude: number;
  latitude: number;

  address: string;

  country: string;

  creationDate: Date;

  editionDate: Date;

  status: Date;

  openingDate: Date;

  closingDate: Date;
  region:Region;
}
