/**
 * Created by dkandpal on 7/24/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from '../services/dashboard.service';
import {AverageResponseTime, OverallAverageResponseTime} from '../model/overall-average-response-time';

@Component({

    selector: 'app-viz-dashboard',
    templateUrl: './viz-dashboard.component.html',
    styleUrls: []

})
export class VizDashboard implements  OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {

        this.router.navigate(['view'], {relativeTo : this.route});
    }

}