import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class HumiditySensorService {

  humidity: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.humidity = db.list('/Humidity');
  }

  getData(){
    return this.humidity;
  }
}
