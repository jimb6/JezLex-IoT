import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {ToastController, NavController, NavParams} from '@ionic/angular';
import { Chart } from 'chart.js';
import {Dsm501aDataService} from "../services/dsm501a-data.service";
import {Mq2dataService} from "../services/mq2data.service";
import {Mq135DataService} from "../services/mq135-data.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HumiditySensorService} from "../services/humidity-sensor.service";


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
    mq2Chart: any;
    mq135Chart: any;
    dsmChart: any;


    @ViewChild('mq2Graph') lineCanvas;
    @ViewChild('celsius') celsius;
    @ViewChild('fahrenheit') fahrenheit;
    @ViewChild('heat_index') heat_index;
    @ViewChild('humidity') humidity;

    dsmTasks: Observable<any[]>;
    mq2Tasks: Observable<any[]>;
    mq135Tasks: Observable<any[]>;
    humidityTasks: Observable<any[]>;

    constructor(
        public navCtrl: NavController,
        private dsm501aDataService: Dsm501aDataService,
        private mq2dataService: Mq2dataService,
        private mq135DataService: Mq135DataService,
        private humiditySensorService: HumiditySensorService,
        public toastController: ToastController,
        ) {
    }

    ionViewDidEnter(){
        this.dsmTasks = this.dsm501aDataService.getData().valueChanges();
        this.dsmTasks.subscribe(actions=> {
            actions.forEach(action => {
                console.log(action.Status);
                console.log(action.datetime);
                console.log(action.Rate);
                this.addData(this.dsmChart, action.datetime, action.Rate);
            });
        });

        this.mq2Tasks = this.mq2dataService.getData().valueChanges();
        this.mq2Tasks.subscribe(actions=> {
            actions.forEach(action => {
                console.log(action.Status);
                console.log(action.datetime);
                console.log(action.Rate);
                this.addData(this.mq2Chart, action.datetime, action.Rate);
            });
        });

        this.mq135Tasks = this.mq135DataService.getData().valueChanges();
        this.mq135Tasks.subscribe(actions=> {
            actions.forEach(action => {
                console.log(action.Status);
                console.log(action.datetime);
                console.log(action.Rate);
                this.addData(this.mq135Chart, action.datetime, action.Rate);
            });
        });

        this.humidityTasks = this.humiditySensorService.getData().valueChanges();
        this.humidityTasks.subscribe(actions=> {
            actions.forEach(action => {
                console.log(action.celsius);
                console.log(action.fahrenheit);
                console.log(action.heat_index);
                console.log(action.humidity);

            });
        });

        this.showMQ2Chart();
        this.showMQ135Chart();
        this.showDSMChart();
    }


    async presentToast() {
        const toast = await this.toastController.create({
            message: 'New Transaction Added',
            duration: 2000
        });
        await toast.present();
    }

    showMQ135Chart() {
        var ctx = (<any>document.getElementById('mq135-chart')).getContext('2d');
        this.mq135Chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: "MQ135 Sensor Data",
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
                    data: [],
                    borderWidth: 1
                }]
            }
        });
    }

    showDSMChart() {
        var ctx = (<any>document.getElementById('dsm-chart')).getContext('2d');
        this.dsmChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "DSM Sensor Data",
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
                    data: [],
                    borderWidth: 1
                }]
            }
        });
    }

    showMQ2Chart() {
        var ctx = (<any>document.getElementById('mq2-chart')).getContext('2d');
        this.mq2Chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "MQ2 Sensor Data",
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
                    data: [],
                    borderWidth: 1
                }]
            }
        });

    }

    setHumidityData(){
        var ctx = (<any>document.getElementById('mq2-chart')).set
    }

    addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }


}
