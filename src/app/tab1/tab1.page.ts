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


    lineCanvas;
    celsius = "Celsius: ";
    fahrenheit = "Fahrenheit: ";
    heat_index =  "Heat Index: ";
    humidity = "Humidity";

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
            this.removeData(this.dsmChart);
            actions.forEach(action => {
                console.log(action.Status);
                console.log(action.datetime);
                console.log(action.Rate);
                this.addData(this.dsmChart, action.datetime, action.Rate);
            });
        });

        this.mq2Tasks = this.mq2dataService.getData().valueChanges();
        this.mq2Tasks.subscribe(actions=> {
            this.removeData(this.mq2Chart);
            actions.forEach(action => {
                console.log(action.Status);
                console.log(action.datetime);
                console.log(action.Rate);
                this.addData(this.mq2Chart, action.datetime, action.Rate);
            });
        });

        this.mq135Tasks = this.mq135DataService.getData().valueChanges();
        this.mq135Tasks.subscribe(actions=> {
            this.removeData(this.mq135Chart);
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
                this.setHumidityData(action);
                console.log(action);
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
                }, {
                    label: 'MQ135 Sensor Data',
                    backgroundColor: [
                        'rgba(22,17,236,0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(7,57,127)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    data: [],
                    type: 'line',
                    // this dataset is drawn on top
                    order: 2
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
                }, {
                    label: 'Line Dataset',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(7,57,127)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    data: [],
                    type: 'line',
                    // this dataset is drawn on top
                    order: 2
                }]
            }
        });

    }

    setHumidityData(data){
        this.celsius = "Celsius: °C" + data.celsius;
        this.fahrenheit = "Fahrenheit: °F" + data.fahrenheit;
        this.heat_index = "Heat Index: HI" + data.heat_index;
        this.humidity = "Humidity: Level " + data.humidity;
    }

    addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }


}
