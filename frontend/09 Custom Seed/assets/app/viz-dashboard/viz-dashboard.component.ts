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
        //this.router.navigate([this.router.url + '/view']);
        this.router.navigate(['view'], {relativeTo : this.route});
    }

    onView() {
        //const newUrl = this.router.url.replace('/create', '/view');
        //this.router.navigate([newUrl]);
        this.router.navigate(['view'], {relativeTo : this.route});
    }

    onCreate() {
        // const newUrl = this.router.url.replace('/view', '/create');
        // this.router.navigate([newUrl]);
        this.router.navigate(['create'], {relativeTo : this.route});
    }



}