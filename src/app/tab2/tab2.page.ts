import { Component } from '@angular/core';
import {HumiditySensorService} from "../services/humidity-sensor.service";
import {ToastController} from "@ionic/angular";
import {InboxServiceService} from "../services/inbox-service.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  inboxItem: any = [] ;
  smsTasks: Observable<any[]>;

  constructor(
      private inboxServices: InboxServiceService,
      public toastController: ToastController,
  ) {}

  ionViewDidEnter(){
    this.smsTasks = this.inboxServices  .getData().valueChanges();
    this.smsTasks.subscribe(actions=> {
      this.inboxItem = [];
      actions.forEach(action => {
        console.log(action.Name);
        console.log(action.Number);
        this.inboxItem.push(action);
      });
    });
  }

  addContactsData(name, number){

  }

  deleteContact(data){
    this.inboxServices  .getData().remove(data);
  }

}
