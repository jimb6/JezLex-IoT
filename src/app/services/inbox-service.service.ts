import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class InboxServiceService {

  inboxService: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.inboxService = db.list('/Contacts');
  }

  getData(){
    return this.inboxService;
  }
}
