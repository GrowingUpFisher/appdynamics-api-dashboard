/**
 * Created by dkandpal on 6/24/17.
 */
import {Component, OnChanges, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from '../services/dashboard.service';
import {AverageResponseTime, OverallAverageResponseTime} from '../model/overall-average-response-time';
import {CachedDataService} from "../services/cached-data.service";

@Component({

    selector: 'app-dashboard-standalone-metric-view',
    templateUrl: './standalone-metric-view.component.html',
    styleUrls: ['./standalone-metric-view.component.css']

})
export class StandaloneMetricViewComponent implements OnInit {



    constructor(private route: ActivatedRoute,
                private router: Router,
                private dashboardService : DashboardService,
                private cachedDataService : CachedDataService) {

    }

    private data : OverallAverageResponseTime[] = [];
    private art : AverageResponseTime = new AverageResponseTime() ;
    public groupedArt = [];


    ngOnInit() {
      //  console.log('this.route.params : ' + this.route.params);
        //this.getAverageResponseTime();
        console.log("CALLING NG ON INIT");
      //  this.groupedArt = this.cachedDataService.groupedArt;
        this.initSocket();


    }






    getAverageResponseTime() {

        this.dashboardService.getAverageResponseTime().subscribe(s => {
            this.art = new AverageResponseTime();
            //console.log("socket response : " + JSON.stringify(s));
            for(let el in s) {
                let e = new OverallAverageResponseTime();
                e.timestamp = new Date(s[el].timestamp);
                e.value = s[el].value;
                this.data.push(e);
            }
            this.art.data = this.data;
        });
    }

    initSocket() {
        this.dashboardService.initSocket({
            application : 'aaqx_prd_POD24',
            path : ["Overall Application Performance", "Average Response Time"],
            channelName : "Average Response Time  |  Overall Application Performance"
        });


        this.dashboardService.observable.subscribe(s => {
          //  console.log("socket response : " + JSON.stringify(s));
            const receivedChannelName = s.channelName;
            const receivedData = s.data;
            var previousArt = null;
            var previousStoredData = [];
            var index = null;

            for(var i=0; i<this.groupedArt.length; i++) {
                    if(this.groupedArt[i].metricName === receivedChannelName) {
                        previousArt = this.groupedArt[i].art;
                        previousStoredData = previousArt.data;
                        index = i;
                        break;
                    }
            }
            for(let el in receivedData) {
                let e = new OverallAverageResponseTime();
                e.timestamp = new Date(receivedData[el].timestamp);
                e.value = receivedData[el].value;
                previousStoredData.push(e);
            }
            if(previousArt === null) {
                previousArt = new AverageResponseTime();
                previousArt.data = previousStoredData;
            }

            const ft = {
                metricName : receivedChannelName,
                art : previousArt
            }

            if(index !== null) {
              //  console.log("NOT Pushing in for the first time");
                this.groupedArt.splice(index, 1, ft);

            } else {
             //   console.log("Pushing in for the first time");

                this.groupedArt.push(ft);
            }


        });

    }











}