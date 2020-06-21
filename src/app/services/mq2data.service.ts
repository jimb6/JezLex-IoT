import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Mq2dataService {

  mq2Data: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.mq2Data = db.list('/MQ2');
  }

  getData(){
    return this.mq2Data;
  }
}
