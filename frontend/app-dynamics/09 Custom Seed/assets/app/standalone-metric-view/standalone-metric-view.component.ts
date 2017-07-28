/**
 * Created by dkandpal on 6/24/17.
 */
import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardService} from '../services/dashboard.service';
import {AverageResponseTime, OverallAverageResponseTime} from '../model/overall-average-response-time';
import {CachedDataService} from "../services/cached-data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({

    selector: 'app-dashboard-standalone-metric-view',
    templateUrl: './standalone-metric-view.component.html',
    styleUrls: ['./standalone-metric-view.component.css']

})
export class StandaloneMetricViewComponent implements OnInit {



    constructor(private route: ActivatedRoute,
                private router: Router,
                private dashboardService : DashboardService,
                private cachedDataService : CachedDataService,
                private fb: FormBuilder) {


    }




    public channels = {};



    ngOnInit() {
        this.channels = this.cachedDataService.channels;
    }

    checkLineGraph(type) {
        return type === 'single-line-graph';
    }


















}