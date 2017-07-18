/**
 * Created by dkandpal on 6/24/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from '../services/dashboard.service';
import {AverageResponseTime, OverallAverageResponseTime} from '../model/overall-average-response-time';
@Component({

    selector: 'app-dashboard-standalone-metric-view',
    templateUrl: './standalone-metric-view.component.html',
    styleUrls: ['./standalone-metric-view.component.css']

})
export class StandaloneMetricViewComponent implements OnInit {



    constructor(private route: ActivatedRoute,
                private router: Router,
                private dashboardService : DashboardService) {

    }

    private data : OverallAverageResponseTime[] = [];
    private art : AverageResponseTime = new AverageResponseTime() ;

    ngOnInit() {
        this.getAverageResponseTime();
    }

    onMetricClick() {
        console.log("this.router.url : " + this.router.url);
        console.log("2 : " + this.route.params);
        console.log("this.route" + this.route);
        this.router.navigate([this.router.url + '/metrics/1']);
    }

    getAverageResponseTime() {

        this.dashboardService.getAverageResponseTime().subscribe(s => {
            this.art = new AverageResponseTime();
            console.log("Received socket data!" + JSON.stringify(s));
            for(let el in s) {
                let e = new OverallAverageResponseTime();
                e.timestamp = new Date(s[el].timestamp);
                e.value = s[el].value;
                this.data.push(e);
                console.log("Data size : " + this.data.length);
            }
            this.art.data = this.data;
        });
    }



}