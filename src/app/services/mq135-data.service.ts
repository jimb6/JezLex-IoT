import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Mq135DataService {

  mq135Data: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.mq135Data = db.list('/MQ135');
    this.tasks = this.mq135Data.snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
    );
  }

  getData(){
    return this.mq135Data;
  }
}
