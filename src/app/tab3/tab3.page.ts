import {Component, ViewChild} from '@angular/core';
import {Chart} from "chart.js";
import {NavController, ToastController} from "@ionic/angular";
import {Dsm501aDataService} from "../services/dsm501a-data.service";
import {Mq2dataService} from "../services/mq2data.service";
import {Mq135DataService} from "../services/mq135-data.service";
import {AppComponent} from "../app.component";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  mq2Chart: any;
  mq135Chart: any;
  dsmChart: any;
  @ViewChild('mq2Graph') lineCanvas;

  chart : any;

  constructor(
      private themeService: ThemeService,
      public navCtrl: NavController,
      private dsm501aDataService: Dsm501aDataService,
      private mq2dataService: Mq2dataService,
      private mq135DataService: Mq135DataService,
      public toastController: ToastController,
  ) {
  }

  ionViewDidEnter(){
    this.dsm501aDataService.getData();
    this.mq2dataService.getData();
    this.mq135DataService.getData();
    this.showOverall();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Transaction Added',
      duration: 2000
    });
    await toast.present();
  }

  showOverall() {
    var ctx = (<any>document.getElementById('all-chart')).getContext('2d');
    this.mq2Chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ["VB 6", "PHP", "Delphi", ".Net", "TypeScript"],
        datasets: [{
          label: "This is chart",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          data: [20, 5, 10, 25, 45],
          borderWidth: 1
        }]
      }
    });
  }

  toggleDarkMode(){
    this.themeService.toggleAppTheme();
  }


}
