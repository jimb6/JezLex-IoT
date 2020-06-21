import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Dsm501aDataService {

  dsm501A: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.dsm501A = db.list('/DSM501A');
  }

  getData(){
    return this.dsm501A;
  }

}
